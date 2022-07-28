import { useExecution } from '@serverless-use/core'
import { afterEach, beforeEach, expect, it } from 'vitest'

import { useRequestCookies } from '.'
import SampleEvent from '../../fixtures/apigw-event-v2.json'
import { useEvent } from '../useEvent'

const { execute, end } = useExecution()
beforeEach(() => {
  execute()
  const { _registerEvent } = useEvent()
  _registerEvent(SampleEvent)
})
afterEach(() => end())

it('Should get all Cookies', () => {
  const { cookies } = useRequestCookies()
  expect(cookies).toMatchObject({
    cookie1: 'value1',
    cookie2: 'value2',
  })
})

it('Should get a single cookie', () => {
  const { get } = useRequestCookies()

  const cookie = get('cookie1')
  expect(cookie).toBe('value1')
})

it('Should be undefined for a non-existent cookie', () => {
  const { get } = useRequestCookies()

  const cookie = get('cookie5')
  expect(cookie).toBeUndefined()
})
