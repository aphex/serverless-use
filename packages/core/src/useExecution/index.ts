import { ulid } from 'ulid'

type Fn = () => void
const EXECUTION_END_HOOKS: Set<Fn> = new Set()
let _id: string | undefined

export function useExecution() {
  return {
    getId() {
      return _id
    },
    isExecuting() {
      return !!_id
    },
    execute(id?: string) {
      if (_id) throw new Error('Only one execution can run at a time')
      if (EXECUTION_END_HOOKS.size) throw new Error('Execution scope leak detected')
      _id = id || ulid()
    },
    end() {
      Array.from(EXECUTION_END_HOOKS)
        .reverse()
        .forEach((fn) => fn())
      EXECUTION_END_HOOKS.clear()
      _id = undefined
    },
    onEnd: (fn: Fn) => {
      EXECUTION_END_HOOKS.add(fn)
    },
  }
}
