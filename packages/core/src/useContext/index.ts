import { createSharedExecutionComposable } from '../createSharedExecutionComposable'

import type { Context } from 'aws-lambda'
// Context is a Singleton, one time registered global so it does not
// need to be reactive either. Once set it will never change for the execution scope.
export const useContext = createSharedExecutionComposable(() => {
  let context: Context | undefined

  return {
    get context() {
      if (!context) throw new Error('Context can only be accessed after it has been registered')
      return context
    },
    get id() {
      if (!context) throw new Error('Context can only be accessed after it has been registered')
      return context.awsRequestId
    },
    _registerContext: (e: Context) => {
      if (context) throw new Error('Context can only be registered once')
      context = e
    },
  }
})
