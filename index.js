addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

async function handleRequest(request) {
  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/alert")) {
    const body = await request.json()

    const payload = {
        "content": null,
        "embeds": [
          {
            "title": body.monitor,
            "description": body.description,
            "url": "https://cronitor.io/app/monitors/" + body.id,
            "color": 16016675,
            "author": {
              "name": body.type + ": " + body.rule
            }
          }
        ]
      }
    await fetch(DISCORD_WEBHOOK, 
    {
    body: JSON.stringify(payload),
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  })

    return new Response();
  }

  return new Response("", {status: 404});
}
