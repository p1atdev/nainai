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

Deno.test("manual request API /ai/generate-image", async () => {
    loadEnv()

    const req = new NAIRequest({
        method: "POST",
        url: NAIStatics.API_URL,
        endpoint: "/ai/generate-image",
        bearer: AUTH_TOKEN(),
        body: JSON.stringify({
            input: "masterpiece, best quality, scenery, ocean, beach",
            model: "nai-diffusion",
            parameters: {
                width: 512,
                height: 768,
                scale: 11,
                sampler: "k_euler_ancestral",
                steps: 24,
                seed: 3340224994,
                n_samples: 1,
                ucPreset: 0,
                qualityToggle: true,
                uc: "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
            },
        }),
    })

    const res = await req.send()

    // stream the response body and save it to a file
    const file = Deno.openSync("./output/image.txt", { create: true, write: true })

    const writableStream = new WritableStream({
        write(chunk) {
            console.log(chunk)
            Deno.writeSync(file.rid, chunk)
        },
    })
    await res.body?.pipeTo(writableStream)

    Deno.close(file.rid)
})
