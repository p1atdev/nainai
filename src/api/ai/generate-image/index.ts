import { NAIEndpointOptions } from "../../../endpoints.ts"
import { NAIRequest } from "../../../request.ts"
import { NAIStatics } from "../../../statics.ts"

export interface PostGenerateImageOptions extends NAIEndpointOptions {
    parameter: NAIGenerateImageParameter
}

export interface NAIGenerateImageParameter {
    input: string
    model: string
    parameters: NAIGenerateImageParameters
}

export interface NAIGenerateImageParameters {
    width: number
    height: number
    scale: number
    sampler: string
    steps: number
    seed: number
    n_samples: number
    ucPreset: number
    qualityToggle: boolean
    uc: string
}

export const PostGenerateImage = async ({ bearer, parameter }: PostGenerateImageOptions) => {
    const req = new NAIRequest({
        method: "GET",
        url: NAIStatics.API_URL,
        endpoint: "/ai/generate-image",
        bearer: bearer,
        body: JSON.stringify(parameter),
    })

    const res = await req.send()
    res.body
        ?.getReader()
        .read()
        .then((value) => {
            console.log(value)
        })
}
