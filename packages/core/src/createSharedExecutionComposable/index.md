# createSharedExecutionComposable
Utility function to wrap any composables making sure they are only run once per execution scope so data can be shared **globally** throughout the execution code.

<!-- ## Configuration -->

## Usage

In this example we share data globally across throughout execution
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