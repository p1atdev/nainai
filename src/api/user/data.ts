import { NAIRequest } from "../../request.ts"
import { NAIStatics } from "../../statics.ts"

export const GetNAIAPIUserData = async (bearer: string) => {
    const req = new NAIRequest({
        method: "GET",
        url: NAIStatics.API_URL,
        endpoint: "/user/data",
        bearer: bearer,
    })

    const res = await req.send()
    const json: NAIUserData = await res.json()

    return json
}

export interface NAIUserData {
    priority: NAIUserDataPriority
    subscription: NAIUserDataSubscription
    keystore: NAIUserDataKeystore
    settings: string
    information: NAIUserDataInformation
}

export interface NAIUserDataInformation {
    emailVerified: boolean
    emailVerificationLetterSent: boolean
    trialActivated: boolean
    trialActionsLeft: number
    accountCreatedAt: number
}

export interface NAIUserDataKeystore {
    changeIndex: number
}

export interface NAIUserDataPriority {
    maxPriorityActions: number
    nextRefillAt: number
    taskPriority: number
}

export interface NAIUserDataSubscription {
    tier: number
    active: boolean
    expiresAt: number
    perks: NAIUserDataPerks
    paymentProcessorData: NAIUserDataPaymentProcessorData
    trainingStepsLeft: NAIUserDataTrainingStepsLeft
}

export interface NAIUserDataPaymentProcessorData {
    c: string
    n: number
    o: string
    p: number
    r: string
    s: string
    t: number
    u: string
}

export interface NAIUserDataPerks {
    maxPriorityActions: number
    startPriority: number
    contextTokens: number
    moduleTrainingSteps: number
    unlimitedMaxPriority: boolean
    voiceGeneration: boolean
    imageGeneration: boolean
    unlimitedImageGeneration: boolean
    unlimitedImageGenerationLimits: NAIUserDataUnlimitedImageGenerationLimit[]
}

export interface NAIUserDataUnlimitedImageGenerationLimit {
    resolution: number
    maxPrompts: number
}

export interface NAIUserDataTrainingStepsLeft {
    fixedTrainingStepsLeft: number
    purchasedTrainingSteps: number
}
