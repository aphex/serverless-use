# createSharedExecutionComposable
Utility function to wrap any composables making sure they are only run once per execution scope so data can be shared **globally** throughout the execution code.

<!-- ## Configuration -->

## Usage

### Shared Execution State
```ts
import { createSharedExecutionComposable } from '@serverless-use/core'

type MyState = {
  name?: string
  image?: string
  profile?: string
}

export const useState = createSharedExecutionComposable(() => {
  // This function will only be run once per execution
  const state: MyState = {}

  // this result will be automatically cached for the execution scope
  // and returned anytime this composable is called
  return { state }
})

```

### Async Composable
::: warning
Generally it is best practice to keep composables synchronous and perform async calls as needed. For example this composable could return a function `getData` that is `async` and caches its response.
:::
```ts
import { createSharedExecutionComposable } from '@serverless-use/core'

const useRemoteData = createSharedExecutionComposable(async () => {
  return new Promise<{ data: string[] }>((resolve) => {
    setTimeout(() => {
      // fetch some async data here
      const data = ['Falkor', 'Atreyu', 'Rockbiter']
      resolve({ data })
    }, 10)
  })
})

// [ 'Falkor', 'Atreyu', 'Rockbiter' ]
const { data } = await useRemoteData()
```