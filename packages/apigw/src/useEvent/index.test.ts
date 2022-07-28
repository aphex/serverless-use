import { useExecution } from '@serverless-use/core'
import { afterEach, beforeEach, expect, it } from 'vitest'

import { useEvent } from '.'
import SampleEvent from '../../fixtures/apigw-event-v2.json'

const { execute, end } = useExecution()
beforeEach(() => execute())
afterEach(() => end())

it('Should error if event is accessed before being set', () => {
  expect(() => {
    const { event } = useEvent()
    return event
  }).toThrowError()
})

it('Should register the event', () => {
  const { _registerEvent } = useEvent()
  _registerEvent(SampleEvent)

  const { event } = useEvent()

  expect(event).toBeTruthy()
})

it('Should throw error if an event is registered more then once', () => {
  const { _registerEvent } = useEvent()
  _registerEvent(SampleEvent)

  expect(() => _registerEvent(SampleEvent)).toThrowError()
})
