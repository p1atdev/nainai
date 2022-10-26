import { NAIEndpointOptions } from "../../../endpoints.ts"
import { NAIRequest } from "../../../request.ts"
import { NAIStatics } from "../../../statics.ts"

export type ModelName = "nai-diffusion"

export interface GetGISuggestTagsOptions extends NAIEndpointOptions {
    model: ModelName
    prompt: string
}

export const GetGISuggestTags = async ({ bearer, model, prompt }: GetGISuggestTagsOptions) => {
    const req = new NAIRequest({
        method: "GET",
        url: NAIStatics.API_URL,
        endpoint: "/ai/generate-image/suggest-tags",
        bearer: bearer,
        queries: {
            model: model,
            prompt: prompt,
        },
    })
    const res = await req.send()
    const json: NAIGISuggestTags = await res.json()

    return json
}

export interface NAIGISuggestTags {
    tags: NAIGISuggestTag[]
}

export interface NAIGISuggestTag {
    tag: string
    count: number
    confidence: number
}
