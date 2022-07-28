import { useExecution } from '@serverless-use/core'
import { afterEach, beforeEach, expect, it } from 'vitest'

import { useResponseCookies } from '.'

const { execute, end } = useExecution()
beforeEach(() => execute())
afterEach(() => end())

it('should be empty object by default', () => {
  const { cookies } = useResponseCookies()

  expect(cookies).toMatchObject({})
})

it('should be able to get and set a cookie', async () => {
  const { get } = useResponseCookies()

  await Promise.resolve().then(async () => {
    const { set } = useResponseCookies()
    set('foo', 'bar')
  })

  const cookie = get('foo')
  expect(cookie).toBe('bar')
})

it('expiring should make the cookie falsey', async () => {
  const { get } = useResponseCookies()

  await Promise.resolve().then(async () => {
    const { expire } = useResponseCookies()
    expire('foo')
  })

  const cookie = get('foo')
  expect(cookie).not.toBeUndefined()
  expect(cookie).toBeFalsy()
})

it('should serialize', async () => {
  const { serialize } = useResponseCookies()

  await Promise.resolve().then(async () => {
    const { set, expire } = useResponseCookies()
    set('bar', 'baz')
    set('quux', 'qux', { maxAge: 5000, priority: 'high' })
    expire('foo')
  })

  const serialized = serialize()
  expect(serialized).toHaveLength(3)
  expect(serialized.join('; ')).toBe(
    'bar=baz; quux=qux; Max-Age=5000; Priority=High; foo=; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
  )
})
