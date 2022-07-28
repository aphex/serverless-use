import { useExecution } from '@serverless-use/core'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { useResponseBody } from '.'

const { execute, end } = useExecution()
beforeEach(() => execute())
afterEach(() => end())

describe('body', () => {
  describe('initial data', () => {
    it('should be empty object by default', () => {
      const { body } = useResponseBody()

      expect(body).toMatchObject({})
    })

    it('should contain initial data when passed only an object', () => {
      const { body } = useResponseBody({ foo: 'bar' })

      expect(body).toMatchObject({ foo: 'bar' })
    })
  })

  describe('Updating Data', () => {
    it('should represent async changes', async () => {
      const { body } = useResponseBody()

      await Promise.resolve().then(() => {
        const { body: _body } = useResponseBody()
        _body.foo = 'bar'
      })

      expect(body).toMatchObject({ foo: 'bar' })
    })

    it('should merge initial and updated', async () => {
      const { body } = useResponseBody({ foo: 'bar', baz: 'qux' })

      await Promise.resolve().then(() => {
        const { body: _body } = useResponseBody()
        _body.baz = 'quux'
      })

      expect(body).toMatchObject({ foo: 'bar', baz: 'quux' })
    })
  })
})

describe('html', () => {
  it('should default to a falsey value', () => {
    const { html } = useResponseBody()

    expect(html.value).toBeFalsy()
  })

  it('should update when changed', async () => {
    const { html } = useResponseBody()

    await Promise.resolve().then(() => {
      const { html: _html } = useResponseBody()
      _html.value = '<h1>Hello</h1>'
    })

    expect(html.value).toBe('<h1>Hello</h1>')
  })
})

describe('text', () => {
  it('should default to a falsey value', () => {
    const { text } = useResponseBody()

    expect(text.value).toBeFalsy()
  })

  it('should update when changed', async () => {
    const { text } = useResponseBody()

    await Promise.resolve().then(() => {
      const { text: _text } = useResponseBody()
      _text.value = 'foo'
    })

    expect(text.value).toBe('foo')
  })
})
