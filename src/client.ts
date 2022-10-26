export class NAIClient {
    private auth_token: string

    constructor({ auth_token }: NAIClientOptions) {
        this.auth_token = auth_token
    }
}

export interface NAIClientOptions {
    auth_token: string
}
