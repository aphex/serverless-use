import { useContext, useExecution } from '@serverless-use/core'

import { useCompression, UseCompressionsConfig } from '../useCompression'
import { useEvent } from '../useEvent'
import { useResponseBody } from '../useResponseBody'
import { useResponseCookies } from '../useResponseCookies'
import { useResponseHeaders } from '../useResponseHeaders'

import type {
  APIGatewayProxyHandler,
  APIGatewayProxyHandlerV2,
  APIGatewayProxyHandlerV2WithJWTAuthorizer,
  APIGatewayProxyHandlerV2WithLambdaAuthorizer,
  APIGatewayProxyResult,
  APIGatewayProxyStructuredResultV2,
  Context,
} from 'aws-lambda'
type ServerlessUseAPIGatewayRequestHandler =
  | APIGatewayProxyHandler
  | APIGatewayProxyHandlerV2
  | APIGatewayProxyHandlerV2WithJWTAuthorizer
  | APIGatewayProxyHandlerV2WithLambdaAuthorizer<any>

// Spelling is hard so lets just cache these away
const SET_COOKIE = 'set-cookie' as const
const CONTENT_TYPE = 'content-type' as const
const APPLICATION_JSON = 'application/json' as const
const TEXT_HTML = 'text/html' as const
const TEXT_PLAIN = 'text/plain' as const

const createResultFromString = (result: string) => {
  return {
    statusCode: 200,
    body: result,
    headers: {
      [CONTENT_TYPE]: APPLICATION_JSON,
    },
  }
}
const createResultFromBoolean = (result: boolean) => {
  return {
    statusCode: result ? 200 : 400,
  }
}

const createResultFromAny = (result: any) => {
  return {
    statusCode: 200,
    headers: { [CONTENT_TYPE]: APPLICATION_JSON },
    body: JSON.stringify(result),
  }
}

// This function is to hack in multiple cookies support in AWS REST API
// since `headers` is an object for the response and we have no `multiValueHeaders`
// in the rest api we can have only 1 `set-cookie` header. So this function will create
// casing variations like `set-cookiE`, `set-cookIe` etc so we can get the max
// number of cookies out of a single response
const caseSetCookieHeader = (index: number) => {
  const base = 'setcookie'
  const max = parseInt(new Array(base.length).fill(1).join(''), 2)
  if (index > max) throw new Error('To many cookies, max is ' + max)

  const binary = index.toString(2).padStart(9, '0')
  const cased = binary
    .split('')
    .map((bit, i) => {
      const character = base.charAt(i)
      return bit === '1' ? character.toUpperCase() : character.toLowerCase()
    })
    .join('')

  return `${cased.slice(0, 3)}-${cased.slice(3)}`
}

export const use = <
  T extends ServerlessUseAPIGatewayRequestHandler = APIGatewayProxyHandlerV2<Record<string, any>>,
>(
  handler: (
    event: Parameters<T>[0],
    context: Parameters<T>[1],
    callback: Parameters<T>[2],
  ) => MaybePromise<
    Awaited<ReturnType<T>> | (boolean | APIGatewayProxyResult | APIGatewayProxyStructuredResultV2)
  >,
  config: {
    onError?: (e: Error) => MaybePromise<APIGatewayProxyStructuredResultV2>
    compression?: boolean | UseCompressionsConfig
    fallbackResult?: T extends APIGatewayProxyHandler
      ? APIGatewayProxyResult
      : APIGatewayProxyStructuredResultV2
    autoTransformResult?: boolean | 'json' | 'html' | 'text'
    apiType?: 'http' | 'rest'
    ignoreWarnings?: boolean
  } = {},
): ((
  ...params: Parameters<typeof handler>
) => Promise<
  APIGatewayProxyResult | APIGatewayProxyStructuredResultV2 | ReturnType<typeof handler>
>) => {
  // Lets setup some default config values
  const {
    onError,
    fallbackResult: fallbackError,
    compression,
    autoTransformResult,
    apiType,
    ignoreWarnings,
  } = {
    compression: true,
    autoTransformResult: true,
    apiType: 'rest',
    ignoreWarnings: false,
    ...config,
  }

  const { execute, end } = useExecution()

  // Wrapper function that will handle:
  // - global storage of the execution state
  // - running user handler
  // - automatic result compression
  // - error handling
  return async (
    event: Parameters<typeof handler>[0],
    context: Context,
    callback: Parameters<typeof handler>[2],
  ) => {
    execute(context.awsRequestId)
    let result: ReturnType<typeof use>
    // First thing we do is add the event and context globally to the
    // scope. This will allow all other composables to access them.
    const { _registerEvent } = useEvent<typeof event>()
    const { _registerContext } = useContext()
    _registerEvent(event)
    _registerContext(context)

    // Global Composables for a handler execution
    const { headers: responseHeaders } = useResponseHeaders()
    const { cookies, serialize } = useResponseCookies()
    const { body, html, text } = useResponseBody()
    const { compress } = useCompression(typeof compression === 'object' ? compression : {})

    try {
      let handlerResult = await handler(event, context, callback)

      // Handler has finished lets check to see if our global composables has been
      // populated with any data
      const hasResponseHeaders = !!Object.keys(responseHeaders).length
      const hasResponseCookies = !!Object.keys(Object.keys(cookies).length)
      const hasResponseBody = !!Object.keys(body).length

      // Opt'd into Auto Transforming Results
      // This will convert
      // - null/void/undefined to a 200 response
      // - booleans to 200/400 responses
      // - strings to 200 response with application/json content-type
      // - custom objects to 200 response with application/json content-type

      if (autoTransformResult) {
        if (handlerResult == null) {
          handlerResult = { statusCode: 200 }
        } else if (typeof handlerResult === 'boolean') {
          handlerResult = createResultFromBoolean(handlerResult)
        } else if (typeof handlerResult === 'string') {
          handlerResult = createResultFromString(handlerResult)
        } else if (typeof handlerResult === 'object' && !handlerResult.statusCode) {
          handlerResult = createResultFromAny(handlerResult)
        }

        // If the user has specifically set the transform type we will use that header
        if (typeof autoTransformResult === 'string') {
          // Lets make sure this exists so we can change headers if we need to
          handlerResult.headers = handlerResult.headers || {}

          if (autoTransformResult === 'json') {
            handlerResult.headers[CONTENT_TYPE] = APPLICATION_JSON
          } else if (autoTransformResult === 'html') {
            handlerResult.headers[CONTENT_TYPE] = TEXT_HTML
          } else if (autoTransformResult === 'text') {
            handlerResult.headers[CONTENT_TYPE] = TEXT_PLAIN
          }
        }

        // If the header composable is going to set the content type lets delete the
        // autotransform content-type and let the users code win this conflict
        if (hasResponseHeaders && responseHeaders[CONTENT_TYPE] && handlerResult.headers)
          delete handlerResult.headers[CONTENT_TYPE]
      }

      // If we have an object at this point as a result we can now merge in composable
      // headers, cookies and body
      if (typeof handlerResult === 'object') {
        // Lets make sure this exists so we can change headers if we need to
        handlerResult.headers = handlerResult.headers || {}

        // Standardize on lowercase headers
        handlerResult.headers = Object.fromEntries(
          Object.entries(handlerResult.headers).map(([key, value]) => {
            return [key.toLowerCase(), value]
          }),
        )

        // Lets apply all the response headers that have accrued through the handlers execution
        if (hasResponseHeaders)
          handlerResult.headers = { ...responseHeaders, ...handlerResult.headers }

        // Apply any Cookies from the composable. If the handler has already set cookies
        // lets merge in the composable ones.
        if (hasResponseCookies) {
          const current = handlerResult?.headers?.[SET_COOKIE] as string | undefined
          const cookies = serialize(current)

          if (cookies.length > 1 && apiType === 'http') {
            const _handlerResult = handlerResult as APIGatewayProxyResult
            if (!_handlerResult.multiValueHeaders) _handlerResult.multiValueHeaders = {}
            _handlerResult.multiValueHeaders[SET_COOKIE] = cookies
          } else if (cookies.length) {
            if (!handlerResult.headers) handlerResult.headers = {}
            const cookieHeaders = Object.fromEntries(
              cookies.map((cookie, i) => [caseSetCookieHeader(i), cookie]),
            )
            handlerResult.headers = { ...cookieHeaders, ...handlerResult.headers }
          }
        }

        // If we have a composable body and the result is a JSON object lets merge together
        // the properties. This will allow composables to add properties to the response
        // If it is an empty response but we have composable body properties
        // we will just use them
        if (hasResponseBody) {
          if (
            handlerResult.headers[CONTENT_TYPE] === APPLICATION_JSON &&
            typeof handlerResult.body === 'string'
          ) {
            handlerResult.body = JSON.stringify({ ...body, ...JSON.parse(handlerResult.body) })
          } else if (!handlerResult.body) {
            if (!handlerResult.headers[CONTENT_TYPE]) {
              handlerResult.headers[CONTENT_TYPE] = APPLICATION_JSON
            }
            handlerResult.body = JSON.stringify(body)
          }
        }

        // If we have no body in the handler response and our useResponseBody
        // composable has plain text or HTML lets use that
        if (!handlerResult.body) {
          if (html.value) {
            handlerResult.headers[CONTENT_TYPE] = TEXT_HTML
            handlerResult.body = html.value
          } else if (text.value) {
            handlerResult.headers[CONTENT_TYPE] = TEXT_PLAIN
            handlerResult.body = text.value
          }
        }

        // If after all the transforms we still don't have headers, lets just remove them
        if (!Object.keys(handlerResult.headers).length) delete handlerResult.headers
      }

      result =
        compression &&
        typeof handlerResult !== 'string' &&
        typeof handlerResult === 'object' &&
        !!handlerResult.statusCode
          ? compress(handlerResult)
          : handlerResult
    } catch (e) {
      try {
        if (onError && e instanceof Error) {
          const errorResult = await onError(e)
          result = compression ? compress(errorResult) : errorResult
        }
      } catch (e) {}
    }

    if (!result) {
      result = fallbackError || {
        statusCode: 500,
        body: 'Internal Server Error',
      }
    }

    end()
    return result
  }
}
