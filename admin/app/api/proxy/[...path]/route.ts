import { NextRequest, NextResponse } from 'next/server'

const UPSTREAM = (process.env.API_UPSTREAM || 'https://afroec-backend.onrender.com/api/v1').replace(/\/$/, '')

function extractAdminToken(setCookieHeaders: string[]): string | null {
  for (const raw of setCookieHeaders) {
    const match = raw.match(/(?:^|,\s*)AFH_ADMIN_TOKEN=([^;]+)/)
    if (match?.[1]) return match[1]
  }
  return null
}

async function proxy(req: NextRequest, pathParts: string[]) {
  const path = pathParts.map(encodeURIComponent).join('/')
  const upstreamUrl = `${UPSTREAM}/${path}${req.nextUrl.search}`

  const headers = new Headers()
  const contentType = req.headers.get('content-type')
  const accept = req.headers.get('accept')
  const requestedWith = req.headers.get('x-requested-with')
  const authorization = req.headers.get('authorization')
  if (contentType) headers.set('content-type', contentType)
  if (accept) headers.set('accept', accept)
  else headers.set('accept', 'application/json')
  if (requestedWith) headers.set('x-requested-with', requestedWith)
  if (authorization) headers.set('authorization', authorization)

  const method = req.method.toUpperCase()
  const hasBody = !['GET', 'HEAD'].includes(method)
  const body = hasBody ? await req.arrayBuffer() : undefined

  let upstream: Response
  try {
    upstream = await fetch(upstreamUrl, {
      method,
      headers,
      body,
      redirect: 'manual',
      cache: 'no-store'
    })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Unable to reach the API server.' },
      { status: 502 }
    )
  }

  const setCookies =
    typeof upstream.headers.getSetCookie === 'function'
      ? upstream.headers.getSetCookie()
      : upstream.headers.get('set-cookie')
        ? [upstream.headers.get('set-cookie') as string]
        : []

  let responseBody = await upstream.text()
  const isLogin = pathParts.join('/') === 'admin/auth/login'

  // Live backend may omit JWT in JSON and only set an HttpOnly cookie with SameSite=Strict,
  // which browsers will not send from localhost. Inject the token into the JSON body instead.
  if (isLogin && upstream.ok) {
    const token = extractAdminToken(setCookies)
    if (token) {
      try {
        const json = JSON.parse(responseBody) as {
          success?: boolean
          data?: Record<string, unknown>
        }
        if (json && typeof json === 'object') {
          json.data = { ...(json.data || {}), token }
          responseBody = JSON.stringify(json)
        }
      } catch {
        // leave body as-is
      }
    }
  }

  const outHeaders = new Headers()
  const upstreamContentType = upstream.headers.get('content-type')
  if (upstreamContentType) outHeaders.set('content-type', upstreamContentType)
  outHeaders.set('cache-control', 'no-store')

  return new NextResponse(responseBody, {
    status: upstream.status,
    headers: outHeaders
  })
}

type Ctx = { params: Promise<{ path: string[] }> }

export async function GET(req: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params
  return proxy(req, path)
}
export async function POST(req: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params
  return proxy(req, path)
}
export async function PUT(req: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params
  return proxy(req, path)
}
export async function PATCH(req: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params
  return proxy(req, path)
}
export async function DELETE(req: NextRequest, ctx: Ctx) {
  const { path } = await ctx.params
  return proxy(req, path)
}
