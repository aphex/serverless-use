# Rick and Morty Example
This example is the beginning a [FWA](https://fwa.dev/). With this lambda handler, IaC from [SST](https://serverless-stack.com/), [Arc](https://arc.codes/), or similar one can simply render HTML in the lambda and return it to the client. Thought this example does not show it a database, like [DynamoDB](https://aws.amazon.com/dynamodb/) could also be added for another level of caching removing much of the need to hit the original API between invocations.

## useRickAndMortyCharacters.ts
```ts
import { createSharedExecutionComposable } from '@serverless-use/core'

type Info = {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

type Character = {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

type CharacterResponse = {
  info: Info
  results: Character[]
}

const API_BASE_URL = 'https://rickandmortyapi.com/api'
// Invocation level cache
const characters: Record<number, Character[]> = {}

export const useRickAndMortyCharacters = createSharedExecutionComposable(() => {
  return {
    getCharacters: async (page: number = 1) => {
      // If we haven't fetched this page yet, fetch it
      if (!characters[page]) {
        console.log('Making request for page', page)
        const response = await fetch(`${API_BASE_URL}/character/?page=${page}`)
        if (response.ok) {
          const data = (await response.json()) as CharacterResponse
          characters[page] = data.results
        }
      }
      return characters[page] || []
    },
  }
})
```

## handler.ts
```ts
import { use, useQueryParameters, useResponseHeaders } from '@serverless-use/apigw'
import { useRickAndMortyCharacters } from '../composables/useRickAndMortyCharacters.ts'
import fetch from 'node-fetch'

export default use(async () => {
  const { set } = useResponseHeaders()
  const { get } = useQueryParameters<{ page?: string }>()
  const { getCharacters } = useRickAndMortyCharacters()

  const page = Math.max(1, parseInt(get('page') || '1'))
  const characters = await getCharacters(page)

  set('Content-Type', 'text/html')
  return /*html*/ `
      <div style="display: inline-flex; flex-direction: column; gap:1rem;">
        <div style="display: grid; grid-template-columns: repeat(4, max-content); gap: 1rem;">
          ${characters
            .map(
              (character) =>
                `<button onclick="updateCharacterImage('${character.image}')">${character.name}</button>`,
            )
            .join('')}
      </div>
      <div style="display: flex; justify-content: space-between;">
        <a 
          ${page <= 1 ? `style='opacity: .5;pointer-events:none;'` : ''} 
          href=/?page=${page - 1}>Previous</a>
        <a href=/?page=${page + 1}>Next</a>
      </div>
      <img style="width: 16rem;" id='character'/>
      
      <script>
        const charactersEl = document.getElementById('character')
        const updateCharacterImage = (url) => charactersEl.src=url
    </script>`
})
```