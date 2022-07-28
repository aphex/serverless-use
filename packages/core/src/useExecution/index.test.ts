import { useExecution } from '@serverless-use/core'
import { afterEach, expect, it, vi } from 'vitest'

const { end } = useExecution()
afterEach(() => end())

it('Should error if executed multiples times without ending', () => {
  const { execute } = useExecution()
  execute()
  expect(() => execute()).toThrowError()
})

it('Should allow for a custom id', () => {
  const { execute, getId } = useExecution()

  execute('foo')
  const id = getId()
  expect(id).toBe('foo')
})

it('Should report correct executing status', () => {
  const { execute, isExecuting } = useExecution()

  execute()
  expect(isExecuting()).toBeTruthy()
})

it('Should call end hook when ended', () => {
  const { execute, end, onEnd } = useExecution()
  const onEndSpy = vi.fn(() => {})
  execute()
  onEnd(onEndSpy)
  end()

  expect(onEndSpy).toHaveBeenCalled()
})

it('Should call end hooks in reverse order', () => {
  const { execute, end, onEnd } = useExecution()
  const order: string[] = []

  execute()
  onEnd(() => order.push('a'))
  onEnd(() => order.push('b'))
  onEnd(() => order.push('c'))
  end()

  expect(order).toMatchObject(['c', 'b', 'a'])
})
