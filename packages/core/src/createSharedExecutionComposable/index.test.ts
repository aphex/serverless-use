import { describe, expect, it, vi } from 'vitest'

import { createSharedExecutionComposable } from '.'
import { useExecution } from '../useExecution'

const { execute, end } = useExecution()

describe('sync', () => {
  it('Should only execute once per execution', () => {
    const handler = vi.fn(() => true)
    execute()

    const composable = createSharedExecutionComposable(handler)
    composable()
    composable()
    composable()
    end()

    expect(handler).toHaveBeenCalledOnce()
  })

  it('Should execute every execution', () => {
    const handler = vi.fn(() => true)
    const composable = createSharedExecutionComposable(handler)

    execute()
    composable()
    end()

    execute()
    composable()
    end()

    expect(handler).toHaveBeenCalledTimes(2)
  })

  it('Should return the same data when called multiple times', () => {
    const handler = vi.fn(() => ({ time: Date.now() }))
    const composable = createSharedExecutionComposable(handler)

    execute()
    const resultA = composable()
    const resultB = composable()
    end()

    expect(resultA).toHaveProperty('time')
    expect(resultA).toBe(resultB)
  })

  it('Should return different data when called in separate executions', () => {
    let id = 0
    const handler = vi.fn(() => ++id)
    const composable = createSharedExecutionComposable(handler)

    execute()
    const resultA = composable()
    end()
    execute()
    const resultB = composable()
    end()

    expect(resultA).toBeTruthy()
    expect(resultB).toBeTruthy()
    expect(resultA).not.toBe(resultB)
  })
})

describe('async', () => {
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  it('Should only execute once per execution', async () => {
    execute()
    const handler = vi.fn(async () => {
      await sleep(1)
      return true
    })

    const composable = createSharedExecutionComposable(handler)
    await composable()
    await composable()
    await composable()
    end()

    expect(handler).toHaveBeenCalledOnce()
  })

  it('Should execute every execution', async () => {
    const handler = vi.fn(async () => {
      await sleep(1)
      return true
    })

    const composable = createSharedExecutionComposable(handler)

    execute()
    await composable()
    end()

    execute()
    await composable()
    end()

    expect(handler).toHaveBeenCalledTimes(2)
  })

  it('Should return the same data when called multiple times', async () => {
    const handler = vi.fn(async () => {
      await sleep(1)
      return { time: Date.now() }
    })
    const composable = createSharedExecutionComposable(handler)

    execute()
    const resultA = await composable()
    const resultB = await composable()
    end()

    expect(resultA).toHaveProperty('time')
    expect(resultA).toBe(resultB)
  })

  it('Should return different data when called in separate executions', async () => {
    const handler = vi.fn(async () => {
      await sleep(1)
      return { time: Date.now() }
    })
    const composable = createSharedExecutionComposable(handler)

    execute()
    const resultA = await composable()
    end()

    execute()
    const resultB = await composable()
    end()

    expect(resultA).toHaveProperty('time')
    expect(resultB).toHaveProperty('time')
    expect(resultA.time).toBeLessThan(resultB.time)
  })
})
