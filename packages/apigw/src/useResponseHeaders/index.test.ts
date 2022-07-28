import { useExecution } from '@serverless-use/core'
import { afterEach, beforeEach, expect, it } from 'vitest'

import { useResponseHeaders } from '.'

const { execute, end } = useExecution()
beforeEach(() => execute())
afterEach(() => end())

it('should be empty object by default', () => {
  const { headers } = useResponseHeaders()

  expect(headers).toMatchObject({})
})

it('should be able to get and set a header', async () => {
  const { get } = useResponseHeaders()

  await Promise.resolve().then(async () => {
    const { set } = useResponseHeaders()
    set('x-foo', 'bar')
  })

  const header = get('x-foo')

  expect(header).toBe('bar')
})

it('should normalize to lower case headers when set', async () => {
  const { get } = useResponseHeaders()

  await Promise.resolve().then(async () => {
    const { set } = useResponseHeaders()
    set('x-FoO', 'bar')
  })

  const header = get('x-foo')

  expect(header).toBe('bar')
})

it('should normalize to lower case headers when get', async () => {
  const { get } = useResponseHeaders()

  await Promise.resolve().then(async () => {
    const { set } = useResponseHeaders()
    set('x-foo', 'bar')
  })

  const header = get('x-FoO')

  expect(header).toBe('bar')
})
