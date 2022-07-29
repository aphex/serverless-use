# Get Started

## Installation
```sh
  npm i @serverless-use/apigw
```


## Basic Handler
```js
import { use, useQueryParameters } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { get } = useQueryParameters()
  const name = get('name')

  return {
    name,
  }
})
```

## Typed Handler
```ts
import { use, useQueryParameters } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { get } = useQueryParameters<{ name: string; email?: string }>()
  const name = get('name')

  return {
    name,
  }
})
```




## Recommended Serverless libraries
### [Architect](https://arc.codes/docs/en/get-started/quickstart)
Simple framework for building on top of AWS with minimal configuration 

### [Serverless Stack](https://serverless-stack.com/)
CDK based platform making IaC simple and powerful