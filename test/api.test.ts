import { GetNAIAPIUserData } from "../src/api/mod.ts"
import { assertEquals, assertExists } from "../deps.ts"
import { AUTH_TOKEN, loadEnv } from "./utils.ts"

Deno.test("API GET /user/data", async () => {
    loadEnv()

    const data = await GetNAIAPIUserData(AUTH_TOKEN())

    assertExists(data)
    assertExists(data.settings)
})
