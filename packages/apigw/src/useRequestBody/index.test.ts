import { useExecution } from '@serverless-use/core'
import { afterEach, beforeEach, expect, it } from 'vitest'

import { useRequestBody } from '.'
import SampleEvent from '../../fixtures/apigw-event-v2.json'
import { useEvent } from '../useEvent'

const JSONEvent = {
  ...SampleEvent,
  ...{
    headers: {
      'content-type': 'application/json',
    },
    body: '{"foo": "bar"}',
  },
}

const { execute, end } = useExecution()
beforeEach(() => {
  execute()
})
afterEach(() => end())

it('Should get the request body', () => {
  const { _registerEvent } = useEvent()
  _registerEvent(SampleEvent)

  const { body } = useRequestBody()

  expect(body).toBe('Hello from Lambda')
})

it('Should parse the request body with application/json', () => {
  const { _registerEvent } = useEvent()
  _registerEvent(JSONEvent)

  const { body } = useRequestBody()
  expect(body).toMatchObject({
    foo: 'bar',
  })
})

it('Should parse the request body with custom reviver', () => {
  const { _registerEvent } = useEvent()
  _registerEvent(JSONEvent)

  const { body } = useRequestBody((_, value) => (typeof value === 'string' ? 'qux' : value))
  expect(body).toMatchObject({ foo: 'qux' })
})
