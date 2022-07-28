import { useExecution } from '@serverless-use/core'
import { afterEach, beforeEach, expect, it } from 'vitest'

import { useCompression } from '.'
import SampleEvent from '../../fixtures/apigw-event-v2.json'
import { useEvent } from '../useEvent'

const { execute, end } = useExecution()
beforeEach(() => {
  execute()
  const { _registerEvent } = useEvent()
  _registerEvent(SampleEvent)
})
afterEach(() => end())

it('should use deflate as default priority', () => {
  const { compress } = useCompression()

  const result = compress({
    body: 'Hello World',
  })

  expect(result).toMatchObject({
    body: 'eJzzSM3JyVcIzy/KSQEAGAsEHQ==',
    headers: { 'content-encoding': 'deflate' },
    isBase64Encoded: true,
  })
})

it('should use deflate options', () => {
  const { compress } = useCompression({ deflate: { level: 2 } })

  const result = compress({
    body: 'Hello World',
  })

  expect(result).toMatchObject({
    body: 'eF7zSM3JyVcIzy/KSQEAGAsEHQ==',
    headers: { 'content-encoding': 'deflate' },
    isBase64Encoded: true,
  })
})

it('should use gzip when specified as default priority', () => {
  const { compress } = useCompression({ priority: ['gzip', 'deflate', 'br'] })

  const result = compress({
    body: 'Hello World',
  })

  expect(result).toMatchObject({
    body: 'H4sIAAAAAAAAA/NIzcnJVwjPL8pJAQBWsRdKCwAAAA==',
    headers: { 'content-encoding': 'gzip' },
    isBase64Encoded: true,
  })
})

it('should not compress when no specified compression types match accept-encoding list', () => {
  const { compress } = useCompression({ priority: ['br'] })

  const result = compress({
    body: 'Hello World',
  })

  expect(result).toMatchObject({ body: 'Hello World' })
})
