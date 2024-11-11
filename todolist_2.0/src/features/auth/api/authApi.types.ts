export type BaseResponse2<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}