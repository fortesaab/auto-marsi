import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'

const host = '0.0.0.0'
const port = Number(process.env.PORT ?? 3000)
const distDir = resolve(process.cwd(), 'dist')
const indexFile = join(distDir, 'index.html')

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
}

function sendFile(request, response, filePath) {
  const extension = extname(filePath)

  response.writeHead(200, {
    'Content-Type': mimeTypes[extension] ?? 'application/octet-stream',
    'Cache-Control':
      extension === '.html'
        ? 'no-store'
        : 'public, max-age=31536000, immutable',
  })

  if (request.method === 'HEAD') {
    response.end()
    return
  }

  createReadStream(filePath)
    .on('error', () => {
      response.writeHead(500, {
        'Content-Type': 'text/plain; charset=utf-8',
      })
      response.end('Internal Server Error')
    })
    .pipe(response)
}

function resolveAssetPath(pathname) {
  const decodedPath = decodeURIComponent(pathname)
  const normalizedPath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, '')
  const filePath = join(distDir, normalizedPath)

  if (!filePath.startsWith(distDir)) {
    return null
  }

  if (existsSync(filePath) && statSync(filePath).isFile()) {
    return filePath
  }

  return null
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host}`)

  if (url.pathname === '/healthz') {
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    if (request.method === 'HEAD') {
      response.end()
      return
    }

    response.end('ok')
    return
  }

  const assetPath = resolveAssetPath(url.pathname)

  sendFile(request, response, assetPath ?? indexFile)
})

server.listen(port, host, () => {
  console.log(`AutoMarsi web listening on http://${host}:${port}`)
})
