import { GetGISuggestTags, GetGISuggestTagsOptions, GetNAIUserData } from "./api/mod.ts"

export class NAIClient {
    private auth_token: string

    constructor({ auth_token }: NAIClientOptions) {
        this.auth_token = auth_token
    }

    user = {
        data: async () => {
            return await GetNAIUserData({ bearer: this.auth_token })
        },
    }

    ai = {
        generate_image: {
            suggest_tags: async ({ model, prompt }: Omit<GetGISuggestTagsOptions, "bearer">) => {
                return await GetGISuggestTags({
                    bearer: this.auth_token,
                    model: model,
                    prompt: prompt,
                })
            },
        },
    }
}

export interface NAIClientOptions {
    auth_token: string
}
