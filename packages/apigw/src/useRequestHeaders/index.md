# useRequestHeaders
Composable to access Request Headers

## Usage
```ts
import { use, useRequestHeaders } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { get, headers } = useRequestHeaders()
  const userAgent = get('user-agent')

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: /*html*/ `
      <div>
        <h1>Single Header</h1>
        <p><b>User Agent: </b> ${userAgent}</p>
      </div>
      <div>
        <h1>All Headers</h1>
        ${Object.entries(headers)
          .map(([key, value]) => `<p><b>${key}:</b> ${value}</p>`)
          .join('')}
      </div>
    `,
  }
})
```