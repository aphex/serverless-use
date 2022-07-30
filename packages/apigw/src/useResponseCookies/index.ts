import { createSharedExecutionComposable } from '@serverless-use/core'
import { CookieSerializeOptions, parse, serialize } from 'cookie'

export const useResponseCookies = createSharedExecutionComposable(<
  T extends Record<string, string>,
>() => {
  let cookies = {} as Record<keyof T, [string, CookieSerializeOptions | undefined]>

  return {
    get cookies() {
      return (
        cookies
          ? Object.fromEntries(Object.entries(cookies).map(([cookie, [value]]) => [cookie, value]))
          : {}
      ) as T
    },
    get(cookie: keyof T) {
      return cookies?.[cookie]?.[0]
    },
    set(cookie: keyof T, value: string, serializeOpts?: CookieSerializeOptions) {
      cookies[cookie] = [value, serializeOpts]
    },
    expire(cookie: keyof T) {
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
