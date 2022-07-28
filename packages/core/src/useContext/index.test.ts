import { afterEach, beforeEach, expect, it } from 'vitest'

import { useContext } from '.'
import SampleContext from '../../fixtures/apigw-context.json'
import { useExecution } from '../useExecution'

const Context = {
  ...SampleContext,
  ...{
    getRemainingTimeInMillis() {
      return 1000
    },
    done() {},
    fail() {},
    succeed() {},
  },
}

const { execute, end } = useExecution()
beforeEach(() => execute())
afterEach(() => end())

it('Should error if context is accessed before being set', () => {
  expect(() => {
    const { context } = useContext()
    return context
  }).toThrowError()
})

it('Should register the context', () => {
  const { _registerContext } = useContext()
  _registerContext(Context)

  const { context } = useContext()

  expect(context).toBeTruthy()
})

it('Should get the context id', () => {
  const { _registerContext } = useContext()
  _registerContext(Context)

  const { id } = useContext()

  expect(id).toBe(Context.awsRequestId)
})

it('Should throw error if an context is registered more then once', () => {
  const { _registerContext } = useContext()
  _registerContext(Context)

  expect(() => _registerContext(Context)).toThrowError()
})
