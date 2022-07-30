---
layout: home

hero:
  name: ServerlessUse
  text: Collection of Serverless Composable Utilities
  tagline: Reusable functions for AWS 
  image:
    src: /serverless-use.svg
    alt: ServerlessUse
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: brand
      text: Api Gateway Examples
      link: /packages/apigw/examples/rick-and-morty
    - theme: alt
      text: View on GitHub
      link: https://github.com/aphex/serverless-use
features:
  - icon: 🎻
    title: Composable functions for common tasks
    details: Simplify code by reusing common functions
  - icon: ⚠️
    title: Global error handling
    details: Provide a single error handler to catch any errors
  - icon: 💻
    title: Strict Execution Scope
    details: Composables all are created once per execution and disposed 🗑️.
  - icon: 🗜️
    title: Automatic Response Compression
    details: Compress all responses Out of the Box
  - icon: 🤖
    title: Automatic Result Transform
    details: Automatically convert common handler returns types for simpler code
  - icon: ⌨
    title: Built with TypeScript
    details: Composables all provide opt in strong typing 💪
---