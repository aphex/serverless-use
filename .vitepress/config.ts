import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ServerlessUse',
  description: 'Documents and Examples for ServerlessUse ',
  themeConfig: {
    nav: [
      {
        text: 'Philosophy',
        link: '/guide/philosophy',
      },
      {
        text: 'Getting Started',
        link: '/guide/getting-started',
      },
      {
        text: 'Composables',
        items: [
          {
            text: 'ApiGateway',
            items: [
              { text: 'use', link: '/packages/apigw/src/use/' },
              { text: 'useCompression', link: '/packages/apigw/src/useCompression/' },
              { text: 'useEvent', link: '/packages/apigw/src/useEvent/' },
              { text: 'useJWTAuthorizer', link: '/packages/apigw/src/useJWTAuthorizer/' },
              {
                text: 'useLambdaAuthorizerContext',
                link: '/packages/apigw/src/useLambdaAuthorizerContext/',
              },
              { text: 'usePathParameters', link: '/packages/apigw/src/usePathParameters/' },
              { text: 'useQueryParameters', link: '/packages/apigw/src/useQueryParameters/' },
              { text: 'useRequestBody', link: '/packages/apigw/src/useRequestBody/' },
              { text: 'useRequestCookies', link: '/packages/apigw/src/useRequestCookies/' },
              { text: 'useRequestHeaders', link: '/packages/apigw/src/useRequestHeaders/' },
              { text: 'useResponseBody', link: '/packages/apigw/src/useResponseBody/' },
              { text: 'useResponseCookies', link: '/packages/apigw/src/useResponseCookies/' },
              { text: 'useResponseHeaders', link: '/packages/apigw/src/useResponseHeaders/' },
            ],
          },
          {
            text: 'Core',
            items: [
              {
                text: 'createSharedExecutionComposable',
                link: '/packages/core/src/createSharedExecutionComposable/',
              },
              { text: 'useContext', link: '/packages/core/src/useContext/' },
              { text: 'useExecution', link: '/packages/core/src/useExecution/' },
            ],
          },
          // { text: 'SNS - Soon ™️', link: '' },
          // { text: 'SQS - Soon ™️', link: '' },
          // { text: 'Dynamo - Soon ™️', link: '' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/aphex/serverless-use' }],
    algolia: {
      appId: '3AH448F13U',
      apiKey: 'f3d74b996581ace7ea2c029a64d68938',
      indexName: 'serverless-use',
    },
    sidebar: {
      '/packages/apigw/examples': [
        {
          text: 'Examples',
          items: [
            { text: 'Rick & Morty', link: '/packages/apigw/examples/rick-and-morty' },
            { text: 'JWT Authentication', link: '/packages/apigw/examples/jwt-auth' },
          ],
        },
      ],
    },
    footer: {
      copyright: 'Copyright © 2022-PRESENT Ross Gerbasi',
    },
  },
})
