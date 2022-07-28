import { useExecution } from '@serverless-use/core'
import { afterEach, beforeEach, expect, it } from 'vitest'

import { useRequestHeaders } from '.'
import SampleEvent from '../../fixtures/apigw-event-v2.json'
import { useEvent } from '../useEvent'

const { execute, end } = useExecution()
beforeEach(() => {
  execute()
  const { _registerEvent } = useEvent()
  _registerEvent(SampleEvent)
})
afterEach(() => end())

it('Should get all the headers', () => {
  const { headers } = useRequestHeaders()
  expect(headers).toMatchObject({
    'accept-encoding': 'gzip, deflate, compress',
    header1: 'value1',
    header2: 'value1,value2',
  })
})

it('Should get a single header', () => {
  const { get } = useRequestHeaders()

  const header = get('header1')
  expect(header).toBe('value1')
})

it('Should get a single header with case insensitivity', () => {
  const { get } = useRequestHeaders()

  const header = get('heAdER1')
  expect(header).toBe('value1')
})

it('Should be undefined for a non-existent header', () => {
  const { get } = useRequestHeaders()

  const header = get('header5')
  expect(header).toBeUndefined()
})
