import { expect, it } from 'vitest'

import { createSharedExecutionComposable } from '.'
import { useExecution } from '../useExecution'

const { execute, end } = useExecution()

it('Should only execute once per execution', () => {
  execute()
  let count = 0

  const composable = createSharedExecutionComposable(() => ++count)
  composable()
  composable()
  composable()
  end()

  expect(count).toBe(1)
})

it('Should execute every execution', () => {
  let count = 0

  const composable = createSharedExecutionComposable(() => ++count)

  execute()
  composable()
  end()

  execute()
  composable()
  end()

  expect(count).toBe(2)
})
