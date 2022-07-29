# Composable Philosophy 🤔

[ServerlessUse](/) is based on the composable ecosystem from the popular frontend framework 
[Vue](https://vuejs.org/guide/reusability/composables.html#composables). A simple concept of letting
functions being the foundation for reusability and composition. Though it does not use any Vue 
it is certainly an extension of the already amazing [VueUse Ecosystem](https://vueuse.org/ecosystem.html)

## Functions First
Javascript is amazingly powerful when you build into it's strengths. A lot of frameworks and libraries
attempt to reinvent the wheel and push developers into practices that slowly drift into a nonstandard.
Developers are then left with obsolete patterns that are harder to share across a team and more
difficult for new developers to [grok](https://en.wikipedia.org/wiki/Grok).

The composable model focuses on functions and there ability to wrap each other easily.

## Invocation vs Execution
[ServerlessUse](/) was built to make developing on AWS easier and faster. Removing a lot of boilerplate
and providing simply composable functions to access common tasks without forcing developers into a 
full middleware model. 

One of the primary concepts to understand prior to diving into AWS lambda coding is the difference
between an Invocation and an Execution.

### Invocation
This is the process by which your lambda is first started. This is generally referred to as a **Cold Start**.
Though it is not completely 1:1 it maybe best to imagine this as a similar process to the browser loading 
a SPA for the first time or [NodeJS](https://nodejs.org/) running an application. The important concept 
to take away from this is that variables can be kept in memory for the lifetime of the invocation. 

AWS will try to keep your lambda **warm** when it is being used often. This means that it is easy to
accidentally share information across requests. It is also a powerful tool to allow for quick caching of 
information that can be reused.

Let's take a look at an Example
```ts
import { use, useEvent } from '@serverless-use/apigw'

// This will live for the lifetime of the invocation
// this means as multiple requests come in this can be shared between them
const times: number[] = []

export default use(() => {
  const { event } = useEvent()

  times.push(event.requestContext.timeEpoch)

  return {
    times,
  }
})
```

As requests come in the `times` array will fill up with the timestamps from executions that happen
throughout the lifetime of the lambda invocation.
```json
{
  "times":[
    1659062050859,
    1659062052117,
    1659062052796
  ]
}
```

### Execution
An [AWS lambda](https://aws.amazon.com/lambda/) is a function that will run on demand as opposed to 
a dedicated server that is on all the time awaiting requests to come into it. Unlike the invocation 
which is the process by which the Lambda **spins up** the execution phase focuses on the lifetime of
the function itself

The [ServerlessUse `use` helper](/packages/apigw/src/use/) helps manage the execution of your lambda by
automatically tracking its start and end. This means that composables can be sure that memory will 
not leak out into other request executions. 

As composables are accessible anywhere in your code it can get confusing and concerning making sure 
you're referring to the correct query parameters or headers. With [ServerlessUse](/) you can be sure
that all composables will be reset in between requests.

This does not mean invocation level shared state will not still work, one can simply declare variables
outside of the execution scope to be able to access them across invocations. 

## Phases of Execution
1. Execution scope is created
2. Event is registered globally
3. Context is registered globally
4. Handler is executed *(hey, its you! 👋)*
5. (optional) Auto-Transform is applied to result
6. Response composables are applied to the result
7. (optional) Result is compressed based on request headers
8. Execution scope is disposed
9. Result is returned