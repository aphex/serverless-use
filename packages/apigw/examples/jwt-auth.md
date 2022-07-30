# JWT Authentication Example
In this example we create a custom composable to handle all the auth for our requests. This will allow any code to `useAuth` and get access to the current user.

We also create a custom error class, `VisibleError`. This will allow us to detect these custom errors and inspect them for a `statusCode` that should be returned to the client. This could be extended greatly for much more customized errors.

Lastly we create our own global error handler, `onError`. This could also be expanded by adding `useAuth` to this handler. If we have a user different error messages could be returned. For example **Admin** users could see full stack traces and detailed info. 


## VisibleError.ts
```ts
class VisibleError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}
```

## useAuth.ts
```ts
import { createSharedExecutionComposable } from '@serverless-use/core'
import { useQueryParameters, useRequestHeaders } from '@serverless-use/apigw'
import JWT from 'jwt-simple'

import VisibleError from '../error/VisibleError'

type User = {
  name: string
  email: string
  sub: string
}

const SECRET = process.env.AUTH_SECRET || 'secret'
export const useAuth = createSharedExecutionComposable(() => {
  let user: User | undefined = undefined

  const { get: getHeader } = useRequestHeaders()
  const { get: getQueryParameters } = useQueryParameters()

  const authHeader = getHeader('Authorization')
  const queryToken = getQueryParameters('token')

  const [type, token] = authHeader?.split(' ') || ['query', queryToken]

  if (token && type) {
    try {
      user = JWT.decode(token, SECRET) as User
    } catch (e) {
      throw new VisibleError((e as Error).message, 401)
    }
  }

  return {
    get user() {
      return user
    },
  }
})
```


## handler.ts
```ts
import { useAuth } from '../composables/useAuth'

import VisibleError from '../error/VisibleError'

export default use(
  async () => {
    const { user } = useAuth()

    if (!user) throw new VisibleError('Unauthorized', 401)

    return {
      user,
    }
  },
  {
    onError: (e: Error) => {
      const statusCode = e instanceof VisibleError ? e.statusCode : 400

      return {
        statusCode,
        headers: {
          'Content-Type': 'text/html',
        },
        body:
          statusCode === 401
            ? '<body style="display: grid; place-content: center;"><img src="https://i.giphy.com/media/wSSooF0fJM97W/giphy.gif"></body>'
            : e.message,
      }
    },
  },
)
```