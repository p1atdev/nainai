import { NAIClient } from "../mod.ts"
import { assertEquals, assertExists } from "../deps.ts"
import { AUTH_TOKEN } from "./utils.ts"

Deno.test("NAIClient get user data", async () => {
    const clinet = new NAIClient({ auth_token: AUTH_TOKEN() })

    const data = await clinet.user.data()

    assertExists(data)
})

Deno.test("NAIClinet generate image / suggest tags", async () => {
    const clinet = new NAIClient({ auth_token: AUTH_TOKEN() })

    interface TestCase {
        prompt: string
        topTag: string
        tagCount: number
    }

    const testCases: TestCase[] = [
        {
            prompt: "scenery",
            topTag: "outdoors",
            tagCount: 9,
        },
        {
            prompt: "victorian",
            topTag: "victorian",
            tagCount: 3,
        },
        {
            prompt: "hatsune",
            topTag: "hat",
            tagCount: 10,
        },
        {
            prompt: "hatsune miku",
            topTag: "hatsune miku",
            tagCount: 10,
        },
    ]

    await Promise.all(
        testCases.map(async (testCase) => {
            const data = await clinet.ai.generate_image.suggest_tags({
                model: "nai-diffusion",
                prompt: testCase.prompt,
            })

            assertExists(data)
            assertEquals(data.tags[0].tag, testCase.topTag)
            assertEquals(data.tags.length, testCase.tagCount)
        })
    )
})
