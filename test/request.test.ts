import { NAIRequest, NAIStatics } from "../mod.ts"
import { assertEquals, assertExists } from "../deps.ts"
import { AUTH_TOKEN, loadEnv } from "./utils.ts"

Deno.test("manual request BASE /status", async () => {
    loadEnv()

    const req = new NAIRequest({
        method: "GET",
        url: NAIStatics.BASE_URL,
        endpoint: "/status",
        bearer: AUTH_TOKEN(),
    })

    const res = await req.send()

    const status = res.status

    await res.body?.cancel()

    assertEquals(status, 200)
})

Deno.test("manual request API /user/data", async () => {
    loadEnv()

    const req = new NAIRequest({
        method: "GET",
        url: NAIStatics.API_URL,
        endpoint: "/user/data",
        bearer: AUTH_TOKEN(),
    })

    const res = await req.send()

    const status = res.status

    assertEquals(status, 200)

    const body = await res.json()

    assertExists(body)
})
