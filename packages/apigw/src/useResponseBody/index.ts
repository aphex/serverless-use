import { createSharedExecutionComposable } from '@serverless-use/core'

export const useResponseBody = createSharedExecutionComposable(<T extends Record<string, any>>(initialData?: T) => {
  const body = initialData || ({} as T)
  const html = {
    value: '',
  }
  const text = {
    value: '',
  }

  return {
    get body() {
      return body
    },
    get html() {
      return html
    },
    get text() {
      return text
    },
  }
})
