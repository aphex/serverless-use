<p align="center">
  <a href="https://github.com/aphex/serverless-use">
    <img src="https://raw.githubusercontent.com/aphex/serverless-use/main/public/serverless-use.svg" alt="ServerlessUse - Collection of Serverless Composable Utilities" width="300">
  </a>
  <br>
  Collection of Serverless Composable Utilities
</p>

<p align="center">
  <a href="https://serverlessuse.com" target="_blank">
    <img src="https://img.shields.io/static/v1?label=&message=ServerlessUse%20Docs&color=2a9d8f" alt="Serverless Use Docs">
  </a>
</p>

## 👀 Features
- 🎻 Composable functions for common tasks
- ⚠️ Global Error handling
- 💻 Strict Execution scope 
- 🗜️ Automatic Response Compression
- 🤖 Automatic Handlers Result Transform
- ⌨️ Built with [TypeScript](https://www.typescriptlang.org/) providing TypeSafe options for all composables

## 🎉 Usage

```ts
import { use, useQueryParameters } from '@serverless-use/apigw'

export const handler = use(async () => {
  const { queryParameters } = useQueryParameters()
  const { name } = queryParameters

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: /*html*/ `
      <body style="display: grid; place-content: center;">
        <h1 style="text-align:center;">Welcome ${name}!</h1>
        <img src="https://i.giphy.com/media/mx9fVEF08tyne/giphy.gif">
      </body>`,
  }
})
```

## 📦 Install

```bash
npm i @serverless-use/apigw
```

## 💓 Thanks

This project is based on **VueUse**

- [VueUse](https://github.com/vueuse/vueuse)
- [Serverless Stacks](https://github.com/serverless-stack/sst)
- [Architect](https://github.com/architect/architect)