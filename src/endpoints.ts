export type NAIURLType = "api" | "base"

export type NAIAPIEndpoint = "/user/data" | "/user/objects/stories" | "/ai/generate-image/suggest-tags"

export type NAIBaseEndpoint = "/tokenizer/clip_tokenizer.json" | "/status"

export type NAIEndpoint = NAIAPIEndpoint | NAIBaseEndpoint