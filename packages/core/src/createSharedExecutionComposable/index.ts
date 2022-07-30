import { useExecution } from '../useExecution'

export function createSharedExecutionComposable<Fn extends (...args: any[]) => MaybePromise<any>>(
  composable: Fn,
): Fn {
  const { onEnd } = useExecution()
  let state: ReturnType<Awaited<Fn>> | undefined

  const dispose = () => {
    if (state) state = undefined
  }

  return <Fn>((...args) => {
    if (!state) {
      const result = composable(...args) || true
      onEnd(dispose)

      if (result instanceof Promise) {
        return result.then((value: typeof state) => {
          state = value
          return state
        })
      } else {
        state = result
      }
    }

    return state
  })
}
