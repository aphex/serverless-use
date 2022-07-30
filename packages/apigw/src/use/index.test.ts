import { describe, expect, it } from 'vitest'

import { use } from '.'
import SampleContext from '../../fixtures/apigw-context.json'
import SampleEvent from '../../fixtures/apigw-event-v2.json'
import { usePathParameters } from '../usePathParameters'
import { useQueryParameters } from '../useQueryParameters'
import { useRequestBody } from '../useRequestBody'
import { useRequestHeaders } from '../useRequestHeaders'
import { useResponseBody } from '../useResponseBody'
import { useResponseCookies } from '../useResponseCookies'
import { useResponseHeaders } from '../useResponseHeaders'

const Context = {
  ...SampleContext,
  ...{
    getRemainingTimeInMillis() {
      return 1000
    },
    done() {},
    fail() {},
    succeed() {},
  },
}

const fn = () => {}

describe('Compression', () => {
  it('should use compress by default', async () => {
    const handler = use(
      async () => {
        return {
          statusCode: 200,
          body: 'Hello World',
        }
      },
      {
        onError(e) {
          console.log(e)
          return {
            statusCode: 500,
          }
        },
      },
    )
    const result = await handler(SampleEvent, Context, fn)
    expect(result).toMatchObject({
      statusCode: 200,
      body: 'eJzzSM3JyVcIzy/KSQEAGAsEHQ==',
      headers: { 'content-encoding': 'deflate' },
      isBase64Encoded: true,
    })
  })
})

describe('AutoTransform', () => {
  it('should transform plain objects to JSON responses', async () => {
    const handler = use(
      async () => {
        return {
          body: 'Hello World',
        }
      },
      { compression: false },
    )
    const result = await handler(SampleEvent, Context, fn)
    expect(result).toMatchObject({
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: '{"body":"Hello World"}',
    })
  })

  it('should transform strings to JSON responses', async () => {
    const handler = use(
      async () => {
        return 'Hello World'
      },

      { compression: false },
    )
    const result = await handler(SampleEvent, Context, fn)
    expect(result).toMatchObject({
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: 'Hello World',
    })
  })

  it('should transform boolean statusCode', async () => {
    const handler = use(
      async () => {
        return true
      },

      { compression: false },
    )
    const result = await handler(SampleEvent, Context, fn)
    expect(result).toMatchObject({
      statusCode: 200,
    })
  })

  it('should respect `autoTransformResult` type for content type of html', async () => {
    const handler = use(
      async () => {
        return 'Hello World'
      },

      { compression: false, autoTransformResult: 'html' },
    )
    const result = await handler(SampleEvent, Context, fn)
    expect(result).toMatchObject({
      statusCode: 200,
      headers: { 'content-type': 'text/html' },
      body: 'Hello World',
    })
  })

  it('should respect `autoTransformResult` type for content type of text', async () => {
    const handler = use(
      async () => {
        return 'Hello World'
      },

      { compression: false, autoTransformResult: 'text' },
    )
    const result = await handler(SampleEvent, Context, fn)
    expect(result).toMatchObject({
      statusCode: 200,
      headers: { 'content-type': 'text/plain' },
      body: 'Hello World',
    })
  })

  it('should respect `autoTransformResult` type for content type of json', async () => {
    const handler = use(
      async () => {
        return 'Hello World'
      },

      { compression: false, autoTransformResult: 'json' },
    )
    const result = await handler(SampleEvent, Context, fn)
    expect(result).toMatchObject({
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: 'Hello World',
    })
  })

  it('should respect `autoTransformResult` false for objects', async () => {
    const handler = use(
      async () => {
        return {
          text: 'Hello World',
        }
      },

      { compression: false, autoTransformResult: false },
    )
    const result = await handler(SampleEvent, Context, fn)
    expect(result).toMatchObject({ text: 'Hello World' })
  })
})
describe('Request Composables', () => {
  it('should read using composables from event', async () => {
    const handler = use(
      async () => {
        const { body } = useRequestBody()
        const { headers } = useRequestHeaders()
        const { queryParameters } = useQueryParameters()
        const { pathParameters } = usePathParameters()

        return {
          statusCode: 200,
          body,
          headers,
          queryParameters,
          pathParameters,
        }
      },
      {
        compression: false,
      },
    )

    const result = await handler(SampleEvent, Context, fn)
    expect(result).toMatchObject({
      statusCode: 200,
      headers: {
        'accept-encoding': 'gzip, deflate, compress',
        header1: 'value1',
        header2: 'value1,value2',
      },
      queryParameters: { parameter1: 'value1,value2', parameter2: 'value' },
      pathParameters: { parameter1: 'value1' },
    })
  })
})

describe('Response Composables', () => {
  describe('headers', () => {
    it('should use composed headers', async () => {
      const handler = use(
        async () => {
          const { set } = useResponseHeaders()
          set('Content-Type', 'text/html')
          return 'Hello World'
        },
        {
          compression: false,
        },
      )

      const result = await handler(SampleEvent, Context, fn)
      expect(result).toMatchObject({
        statusCode: 200,
        body: 'Hello World',
        headers: { 'content-type': 'text/html' },
      })
    })

    it('should use returned handlers headers in case of a merge conflict', async () => {
      const handler = use(
        async () => {
          const { set } = useResponseHeaders()
          set('Content-Type', 'text/html')

          return {
            statusCode: 200,
            headers: {
              'Content-Type': 'text/plain',
            },
            body: 'Hello World',
          }
        },
        {
          compression: false,
        },
      )

      const result = await handler(SampleEvent, Context, fn)
      expect(result).toMatchObject({
        statusCode: 200,
        body: 'Hello World',
        headers: { 'content-type': 'text/plain' },
      })
    })

    it('should merge handler and composable headers', async () => {
      const handler = use(
        async () => {
          const { set } = useResponseHeaders()
          set('x-FOO', 'bar')

          return {
            statusCode: 200,
            headers: {
              'Content-Type': 'text/html',
            },
            body: 'Hello World',
          }
        },
        {
          compression: false,
        },
      )

      const result = await handler(SampleEvent, Context, fn)
      expect(result).toMatchObject({
        statusCode: 200,
        body: 'Hello World',
        headers: {
          'x-foo': 'bar',
          'content-type': 'text/html',
        },
      })
    })
  })

  describe('cookies', () => {
    it('should use composed cookies', async () => {
      const handler = use(
        async () => {
          const { set } = useResponseCookies()
          set('foo', 'bar')
        },
        {
          compression: false,
        },
      )

      const result = await handler(SampleEvent, Context, fn)
      expect(result).toMatchObject({
        statusCode: 200,
        headers: {
          'set-cookie': 'foo=bar',
        },
      })
    })

    it('should use composed cookies with custom settings', async () => {
      const handler = use(
        async () => {
          const { set } = useResponseCookies()
          set('foo', 'bar', { maxAge: 1000, priority: 'high' })
        },
        {
          compression: false,
        },
      )

      const result = await handler(SampleEvent, Context, fn)
      expect(result).toMatchObject({
        statusCode: 200,
        headers: {
          'set-cookie': 'foo=bar; Max-Age=1000; Priority=High',
        },
      })
    })

    it('should use `multiValueHeaders` for http and multiple composed cookies', async () => {
      const handler = use(
        async () => {
          const { set } = useResponseCookies()
          set('foo', 'bar')
          set('baz', 'qux')
        },
        {
          compression: false,
          apiType: 'http',
        },
      )

      const result = await handler(SampleEvent, Context, fn)
      expect(result).toMatchObject({
        statusCode: 200,
        multiValueHeaders: {
          'set-cookie': ['foo=bar', 'baz=qux'],
        },
      })
    })
  })

  describe('body', () => {
    it('should use composed body object', async () => {
      const handler = use(
        async () => {
          const { body } = useResponseBody()
          body.foo = 'bar'
          body.baz = 'qux'
        },
        {
          compression: false,
        },
      )

      const result = await handler(SampleEvent, Context, fn)
      expect(result).toMatchObject({
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        body: '{"foo":"bar","baz":"qux"}',
      })
    })

    it('should merge composed body object with handler', async () => {
      const handler = use(
        async () => {
          const { body } = useResponseBody()
          body.foo = 'bar'
          body.baz = 'qux'

          return {
            buz: 'bop',
          }
        },
        {
          compression: false,
        },
      )

      const result = await handler(SampleEvent, Context, fn)
      expect(result).toMatchObject({
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        body: '{"foo":"bar","baz":"qux","buz":"bop"}',
      })
    })

    it('handler should win during merge conflict with composed body', async () => {
      const handler = use(
        async () => {
          const { body } = useResponseBody()
          body.foo = 'bar'
          body.baz = 'qux'

          return {
            foo: 'bop',
          }
        },
        {
          compression: false,
        },
      )

      const result = await handler(SampleEvent, Context, fn)
      expect(result).toMatchObject({
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        body: '{"foo":"bop","baz":"qux"}',
      })
    })

    it('should use html', async () => {
      const handler = use(
        async () => {
          const { html } = useResponseBody()
          html.value = '<h1>Hello World</h1>'
        },
        {
          compression: false,
        },
      )

      const result = await handler(SampleEvent, Context, fn)
      expect(result).toMatchObject({
        statusCode: 200,
        headers: { 'content-type': 'text/html' },
        body: '<h1>Hello World</h1>',
      })
    })

    it('should use plain text', async () => {
      const handler = use(
        async () => {
          const { text } = useResponseBody()
          text.value = 'Hello World'
        },
        {
          compression: false,
        },
      )

      const result = await handler(SampleEvent, Context, fn)
      expect(result).toMatchObject({
        statusCode: 200,
        headers: { 'content-type': 'text/plain' },
        body: 'Hello World',
      })
    })
  })
})

describe('Error Handling', () => {
  it('should use the error handler for thrown errors', async () => {
    const error = {
      statusCode: 400,
      body: 'Uh Oh',
    }
    const handler = use(
      async () => {
        throw new Error(error.body)
      },
      {
        onError() {
          return error
        },
        compression: false,
      },
    )
    const result = await handler(SampleEvent, Context, fn)
    expect(result).toMatchObject(error)
  })

  it('should compress error bodies by default', async () => {
    const error = {
      statusCode: 400,
      body: 'Uh Oh',
    }
    const handler = use(
      async () => {
        throw new Error(error.body)
      },
      {
        onError() {
          return error
        },
      },
    )
    const result = await handler(SampleEvent, Context, fn)
    expect(result).toMatchObject({
      statusCode: 400,
      body: 'eJwLzVDwzwAABLQBlQ==',
      headers: { 'content-encoding': 'deflate' },
      isBase64Encoded: true,
    })
  })

  it('should use default 500 error if no handler specified', async () => {
    const handler = use(async () => {
      throw new Error('uh oh')
    })
    const result = await handler(SampleEvent, Context, fn)
    expect(result).toMatchObject({
      statusCode: 500,
      body: 'Internal Server Error',
    })
  })

  it('should use fallback error if no handler specified', async () => {
    const fallbackResult = {
      statusCode: 400,
      body: 'something went wrong',
    }
    const handler = use(
      async () => {
        throw new Error('uh oh')
      },
      {
        fallbackResult,
        compression: false,
      },
    )
    const result = await handler(SampleEvent, Context, fn)
    expect(result).toMatchObject(fallbackResult)
  })
})
