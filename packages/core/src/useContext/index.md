# useContext
Provides global access to the current execution [AWS Context](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html). 
<!-- ## Configuration -->

## Usage

```ts
import { useContext } from '@serverless-use/core'

const { context, id } = useExecution()

// AWS Request ID for this execution
console.log(id)

// AWS lambda function name
console.log(context.functionName )
```