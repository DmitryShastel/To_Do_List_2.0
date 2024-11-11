import axios from "axios";
import {TodolistType} from "./todolistsApi.types";
import {BaseResponse2} from "../../auth/api/authApi.types";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '9f9da7ee-2def-4ec9-bde3-f37a343d34bd'
    }
}
export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})



export const todolistsApi = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<BaseResponse2<{ item: TodolistType }>>('todo-lists', { title: title })
    },
    deleteTodolist(id: string) {
        return instance.delete<BaseResponse2<{ item: TodolistType }>>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<BaseResponse2<{ item: TodolistType }>>(`todo-lists/${id}`, { title: title })
    },

}