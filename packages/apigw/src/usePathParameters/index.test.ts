import { useExecution } from '@serverless-use/core'
import { afterEach, beforeEach, expect, it } from 'vitest'

import { usePathParameters } from '.'
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
  const { pathParameters } = usePathParameters()
  expect(pathParameters).toMatchObject({
    parameter1: 'value1',
  })
})

it('Should get a single parameter', () => {
  const { get } = usePathParameters()

  const parameter = get('parameter1')
  expect(parameter).toBe('value1')
})

it('Should be undefined for a non-existent parameter', () => {
  const { get } = usePathParameters()

  const parameter = get('parameter5')
  expect(parameter).toBeUndefined()
})
