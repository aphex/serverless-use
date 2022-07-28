import { createSharedExecutionComposable } from '@serverless-use/core'
import { CookieSerializeOptions, parse, serialize } from 'cookie'

export const useResponseCookies = createSharedExecutionComposable(<T extends string>() => {
  const cookies: Record<string, [string, CookieSerializeOptions | undefined]> = {}

  return {
    get cookies() {
      return Object.fromEntries(Object.entries(cookies).map(([cookie, [value]]) => [cookie, value])) as Record<
        T,
        string
      >
    },
    get(cookie: T) {
      return cookies?.[cookie]?.[0]
    },
    set(cookie: T, value: string, serializeOpts?: CookieSerializeOptions) {
      cookies[cookie] = [value, serializeOpts]
    },
    expire(cookie: T) {
      cookies[cookie] = ['', { expires: new Date(0) }]
    },
    serialize(existing?: string) {
      const existingCookies = parse(existing || '')

      return [
        existing,
        ...Object.entries(cookies).map(([cookie, [value, opts]]) =>
          !existingCookies[cookie] ? serialize(cookie, value, opts) : false
        ),
      ].filter(Boolean) as string[]
    },
  }
})
