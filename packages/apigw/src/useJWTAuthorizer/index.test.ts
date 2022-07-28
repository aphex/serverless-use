import { useExecution } from '@serverless-use/core'
import { afterEach, beforeEach, expect, it } from 'vitest'

import { useJWTAuthorizer } from '.'
import SampleEvent from '../../fixtures/apigw-event-v2.json'
import { useEvent } from '../useEvent'

const { execute, end } = useExecution()
beforeEach(() => {
  execute()
  const { _registerEvent } = useEvent()
  _registerEvent(SampleEvent)
})
afterEach(() => end())

it('Should get an existing claim', () => {
  const { getClaim } = useJWTAuthorizer()
  const claim = getClaim('claim1')
  expect(claim).toBe('value1')
})

it('Should be undefined for a non-existent claim', () => {
  const { getClaim } = useJWTAuthorizer()
  const claim = getClaim('claim5')
  expect(claim).toBeUndefined()
})

it('Should check an existing scope', () => {
  const { hasScope } = useJWTAuthorizer()

  const hasScope1 = hasScope('scope1')
  expect(hasScope1).toBeTruthy()
})

it('Should check a non-existing scope', () => {
  const { hasScope } = useJWTAuthorizer()

  const hasScope5 = hasScope('scope5')
  expect(hasScope5).toBeFalsy()
})
