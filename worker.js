addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  if (url.pathname.startsWith("/callback")) {
    const target = "https://oauth.netlify.com" + url.pathname + url.search
    const response = await fetch(target, {
      method: request.method,
      headers: request.headers,
      body: request.body
    })
    return new Response(response.body, response)
  }
  return new Response("Proxy active. Awaiting OAuth requests.")
}
