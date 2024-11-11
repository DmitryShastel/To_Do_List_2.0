import {instance} from "../../TodolistList/api/todolistsApi";
import {BaseResponse2, LoginParamsType} from "./authApi.types";

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<BaseResponse2<{ userId: number }>>('auth/login', data)
    },
    me() {
        return instance.get<BaseResponse2<{ id: number; email: string, login: string }>>('auth/me')
    },
    logout() {
        return instance.delete<BaseResponse2<{ userId?: number }>>('auth/login')
    }
}