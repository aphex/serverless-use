import { useExecution } from '../useExecution'

export function createSharedExecutionComposable<Fn extends (...args: any[]) => any>(
  composable: Fn,
): Fn {
  const { onEnd } = useExecution()
  let state: ReturnType<Fn> | undefined

  const dispose = () => {
    if (state) state = undefined
  }

  return <Fn>((...args) => {
    if (!state) {
      state = composable(...args)
      onEnd(dispose)
    }

    return state
  })
}
