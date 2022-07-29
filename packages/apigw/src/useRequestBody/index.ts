import { createSharedExecutionComposable } from '@serverless-use/core'

import { useEvent } from '../useEvent'
import { useRequestHeaders } from '../useRequestHeaders'

type JsonValue = { [index: string]: JsonValue } | JsonValue[] | boolean | null | number | string

type JsonObject = { [index: string]: JsonValue } | JsonValue[]

export const useRequestBody = createSharedExecutionComposable(
  <T extends string | JsonObject | undefined = any>(reviver?: Parameters<typeof JSON.parse>[1]) => {
    const { event } = useEvent()
    const { get } = useRequestHeaders()
    const contentType = get('content-type')
    const isBase64Encoded = event.isBase64Encoded

    const body =
      event.body && isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body

    const _body: T =
      typeof body === 'string' && contentType === 'application/json'
        ? JSON.parse(body, reviver)
        : body

    return {
      get body() {
        return _body
      },
    }
  },
)
