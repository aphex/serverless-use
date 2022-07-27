import { createSharedExecutionComposable } from '@serverless-use/core'
import { CookieSerializeOptions, parse, serialize } from 'cookie'

export const useResponseCookies = createSharedExecutionComposable(() => {
  const cookies: Record<string, [string, CookieSerializeOptions | undefined]> = {}

  return {
    get cookies() {
      return Object.fromEntries(Object.entries(cookies).map(([cookie, [value]]) => [cookie, value]))
    },
    get(cookie: string) {
      return cookies?.[cookie]?.[0]
    },
    set(cookie: string, value: string, serializeOpts?: CookieSerializeOptions) {
      cookies[cookie] = [value, serializeOpts]
    },
    expire(cookie: string) {
      cookies[cookie] = ['', { expires: new Date(0) }]
    },
    serialize(existing?: string) {
      const existingCookies = parse(existing || '')

      return [
        existing,
        ...Object.entries(cookies).map(([cookie, [value, opts]]) =>
          !existingCookies[cookie] ? serialize(cookie, value, opts) : false,
        ),
      ].filter(Boolean) as string[]
    },
  }
})
