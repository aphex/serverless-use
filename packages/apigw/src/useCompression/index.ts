import { compress } from 'lzw-compressor'
import { brotliCompressSync, deflateSync, gzipSync } from 'zlib'

import { useRequestHeaders } from '../useRequestHeaders'

import type {
  APIGatewayProxyHandler,
  APIGatewayProxyHandlerV2,
  APIGatewayProxyResult,
  APIGatewayProxyStructuredResultV2,
} from 'aws-lambda'
import type { BrotliOptions, ZlibOptions } from 'zlib'
// All the compression formats we can support
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
const SUPPORTED_COMPRESSION_FORMATS = [
  'gzip',
  'compress',
  'deflate',
  'br',
  'identity',
  '*',
] as const
type SupportedCompressionType = typeof SUPPORTED_COMPRESSION_FORMATS[number]

export type UseCompressionsConfig = {
  brotli?: BrotliOptions
  gzip?: ZlibOptions
  deflate?: ZlibOptions
  priority?: SupportedCompressionType[]
}
// Compression Composable
export const useCompression = ({ brotli, gzip, deflate, priority }: UseCompressionsConfig = {}) => {
  const { get } = useRequestHeaders()

  // This is the server compression priority. Lower in the list is higher priority
  // If the user does not pass one in, set our default
  const _priority = priority || ['deflate', 'gzip', 'br', 'compress']

  // Determine the encoding to use from the Accept-Encoding header using our priority list and weight
  const encoding = ((get('accept-encoding') || '')
    // split up the encoding options
    .split(',')
    // map them from the header value string to an object we can grok
    .map((encoding, i) => {
      const [name, q] = encoding.split(';q=').map((s) => s.trim())

      // If there is no name, lets just default to * (no compression)
      if (!name) return { format: '*', q: 0, index: _priority.length }

      // Grab the priority of this compression format from our priority list
      const index = _priority.indexOf(name as SupportedCompressionType)

      return {
        format: name.toLowerCase().trim(),
        q: q ? parseFloat(q) : 1,
        // If the user clears the priority list set on the server side lets fallback to the
        // index the client sent. Otherwise lets use the server priority for
        // preferred compression types
        index: !_priority.length ? i : index >= 0 ? index : _priority.length,
      }
    })
    // filter out any compression formats we do not support
    .filter(({ format }) =>
      SUPPORTED_COMPRESSION_FORMATS.includes(format as SupportedCompressionType),
    )
    // sort by weight and priority index, same q value will fallback to our priority
    // if the format's priority index is less sort it lower (higher priority)
    // if the format's client weight is lower sort it higher (lower priority)
    .sort((a, b) => (b.q === a.q ? (a.index < b.index ? -1 : 1) : a.q < b.q ? 1 : -1))
    // map to just the format name
    .map(({ format }) => format)
    // grab the first one and if we have nothing left lets just use identity (no compression)
    .shift() || 'identity') as SupportedCompressionType

  return {
    /**
     * Compress function will compress the body of a response by auto selecting the encoding type from
     * the request header and using that.
     */
    compress(
      input: Exclude<
        Awaited<ReturnType<APIGatewayProxyHandler> | ReturnType<APIGatewayProxyHandlerV2>>,
        void | string
      >,
    ): typeof input extends APIGatewayProxyResult
      ? APIGatewayProxyResult
      : APIGatewayProxyStructuredResultV2 {
      // convert simple strings to an object as we will need headers to inform client of encoding
      input = typeof input === 'string' ? { body: input, headers: undefined } : input

      const { body } = input

      // Lets check for no-op work here
      if (!body) return input
      if (encoding === 'identity') return input
      if (encoding === '*') return input

      // Determine the compressed body by running the correct compressor on its original content
      let compressedBody
      switch (encoding) {
        case 'gzip':
          compressedBody = gzipSync(body, gzip).toString('base64')
          break
        case 'deflate':
          compressedBody = deflateSync(body, deflate).toString('base64')
          break
        case 'br':
          compressedBody = brotliCompressSync(body, brotli).toString('base64')
          break
        case 'compress':
          compressedBody = Buffer.from(compress(body)).toString('base64')
          break
      }
      // Something must have gone wrong here, somehow it didn't get compressed, so lets just return the original
      if (!compressedBody) return input

      // Recreate the Result object using the original but with the compressed body and new header
      return {
        ...input,
        headers: {
          ...input.headers,
          'content-encoding': encoding,
        },
        isBase64Encoded: true,
        body: compressedBody,
      }
    },
  }
}
