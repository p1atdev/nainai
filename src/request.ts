import { NAIEndpoint } from "./endpoints.ts"
import { NAIStatics } from "./statics.ts"

export class NAIRequest {
    private method: string
    private url: string
    private endpoint: NAIEndpoint
    private bearer: string
    private queries: Record<string, string> = {}
    private body: any

    constructor({ url, method, endpoint, bearer, queries, body }: NAIRequestOptions) {
        this.url = url
        this.method = method
        this.endpoint = endpoint
        this.bearer = bearer
        if (queries) {
            this.queries = queries
        }
        this.body = body
    }

    async send() {
        const headers: Headers = new Headers()
        headers.append("Authorization", `Bearer ${this.bearer}`)

        const url = new URL(this.url + this.endpoint)
        for (const [key, value] of Object.entries(this.queries)) {
            url.searchParams.append(key, value)
        }

        const response = await fetch(url, {
            method: this.method,
            headers: headers,
            body: this.body,
        })

        return response
    }
}

type NAIURL = typeof NAIStatics.API_URL | typeof NAIStatics.BASE_URL

export interface NAIRequestOptions {
    method: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS"
    url: NAIURL
    endpoint: NAIEndpoint
    bearer: string
    queries?: Record<string, string>
    body?: any
}
