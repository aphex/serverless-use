import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ServerlessUse',
  description: 'Documents and Examples for ServerlessUse ',
  themeConfig: {
    nav: [
      {
        text: 'Getting Started',
        link: '/guide/getting-started',
      },
      {
        text: 'Composables',
        items: [
          {
            text: 'Core',
            items: [
              { text: 'createSharedComposable', link: '/packages/core/createSharedComposable/' },
              { text: 'useExecution', link: '/packages/core/useExecution/' },
              { text: 'useContext', link: '/packages/core/useContext/' },
            ],
          },
          {
            text: 'ApiGateway',
            items: [
              { text: 'use', link: '/packages/apigw/use/' },
              { text: 'useCompression', link: '/packages/apigw/useCompression/' },
              { text: 'useEvent', link: '/packages/apigw/useEvent/' },
              {
                text: 'useLambdaAuthorizerContext',
                link: '/packages/apigw/useLambdaAuthorizerContext/',
              },
              { text: 'useQueryParameters', link: '/packages/apigw/useQueryParameters/' },
              { text: 'useRequestCookies', link: '/packages/apigw/useRequestCookies/' },
              { text: 'useRequestHeaders', link: '/packages/apigw/useRequestHeaders/' },
              { text: 'useResponseBody', link: '/packages/apigw/useRequestHeaders/' },
              { text: 'useResponseCookies', link: '/packages/apigw/useRequestHeaders/' },
              { text: 'useResponseHeaders', link: '/packages/apigw/useRequestHeaders/' },
            ],
          },
          // { text: 'SNS - Soon ™️', link: '' },
          // { text: 'SQS - Soon ™️', link: '' },
          // { text: 'Dynamo - Soon ™️', link: '' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/aphex/serverless-use' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-PRESENT Ross Gerbasi',
    },
  },
})
