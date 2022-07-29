# useEvent
Composable to access the Handler Event

## Usage

```ts
import { use, useEvent } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { event } = useEvent()

  return {
    event,
  }
})
```