import { dotenv } from "../deps.ts"

export const loadEnv = () => {
    dotenv.configSync({
        export: true,
        path: ".env.local",
    })
}

export const AUTH_TOKEN = () => {
    return Deno.env.get("NAI_AUTH_TOKEN") as string
}
