# useCompression
General utility to compress the servers response. 

::: info
This is built into the [use](../use/) handler
which will automatically inspect request headers and use compression for the response.
:::

## Usage
### Custom Compression
```ts
import { use, useCompression } from '@serverless-use/apigw'
import zlib from 'zlib'

export const handler = use(
  async () => {
    const { compress } = useCompression({
      priority: ['br'],
      brotli: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 2,
        },
      },
    })

    try {
      return compress({
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html',
        },
        body: 'You must live your story.',
      })
    } catch (e) {
      return {
        statusCode: 400,
      }
    }
  },
  // disable built in compression
  { compression: false },
)
```
