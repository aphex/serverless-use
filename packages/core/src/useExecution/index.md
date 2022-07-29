# useExecution
Utility to manage the execution scope of the Lambda. This is automatically managed by the `use` 
function that wraps a handler. 

<!-- ## Configuration -->

## Usage

### Create and End an Execution Scope
```ts
import { useExecution } from '@serverless-use/core'

const { execute, end } = useExecution()
execute()
// Run code here
end()

```

### Execution cleanup
```ts
import { useExecution } from '@serverless-use/core'

const { execute, end, onEnd } = useExecution()
execute()
onEnd(() => {
  // cleanup here will run when `end` is called 
})
// Run code here
end()

```
