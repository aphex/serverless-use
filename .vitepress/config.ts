import { defineConfig } from 'vitepress'

const apiGatewayComposables = [
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
]

const coreComposables = [
  {
    text: 'createSharedExecutionComposable',
    link: '/packages/core/src/createSharedExecutionComposable/',
  },
  { text: 'useContext', link: '/packages/core/src/useContext/' },
  { text: 'useExecution', link: '/packages/core/src/useExecution/' },
]

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
            items: apiGatewayComposables,
          },
          {
            text: 'Core',
            items: coreComposables,
          },
          // { text: 'SNS - Soon ™️', link: '' },
          // { text: 'SQS - Soon ™️', link: '' },
          // { text: 'Dynamo - Soon ™️', link: '' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/aphex/serverless-use' }],
    algolia: {
      appId: 'TZW9AHYYOF',
      apiKey: '0c2c784c9712625303239628ab2d04f6',
      indexName: 'serverlessuse',
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
      '/packages/apigw/src': [
        {
          text: 'API Gateway Composables',
          items: apiGatewayComposables,
        },
        {
          text: 'Core Composables',
          items: coreComposables,
        },
      ],
    },
    footer: {
      copyright: 'Copyright © 2022-PRESENT Ross Gerbasi',
    },
  },
})
