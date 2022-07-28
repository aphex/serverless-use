import { useExecution } from '@serverless-use/core'
import { afterEach, beforeEach, expect, it } from 'vitest'

import { useQueryParameters } from '.'
import SampleEvent from '../../fixtures/apigw-event-v2.json'
import { useEvent } from '../useEvent'

const { execute, end } = useExecution()
beforeEach(() => {
  execute()
  const { _registerEvent } = useEvent()
  _registerEvent(SampleEvent)
})
afterEach(() => end())

it('Should get all the query parameters', () => {
  const { queryParameters } = useQueryParameters()
  expect(queryParameters).toMatchObject({
    parameter1: 'value1,value2',
    parameter2: 'value',
  })
})

it('Should get a single parameter', () => {
  const { get } = useQueryParameters()

  const parameter = get('parameter2')
  expect(parameter).toBe('value')
})

it('Should be undefined for a non-existent parameter', () => {
  const { get } = useQueryParameters()

  const parameter = get('parameter5')
  expect(parameter).toBeUndefined()
})
