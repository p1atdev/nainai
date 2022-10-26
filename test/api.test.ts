import { GetGISuggestTags, GetNAIAPIUserData } from "../src/api/mod.ts"
import { assertEquals, assertExists } from "../deps.ts"
import { AUTH_TOKEN, loadEnv } from "./utils.ts"

Deno.test("API GET /user/data", async () => {
    loadEnv()

    const data = await GetNAIAPIUserData({ bearer: AUTH_TOKEN() })

    assertExists(data)
    assertExists(data.settings)
})

Deno.test("API /ai/generate-image/suggest-tags", async () => {
    loadEnv()

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
            const data = await GetGISuggestTags({
                bearer: AUTH_TOKEN(),
                model: "nai-diffusion",
                prompt: testCase.prompt,
            })

            assertExists(data)
            assertEquals(data.tags[0].tag, testCase.topTag)
            assertEquals(data.tags.length, testCase.tagCount)
        })
    )
})
