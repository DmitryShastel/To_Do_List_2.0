import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '9f9da7ee-2def-4ec9-bde3-f37a343d34bd'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TasksType = {
    [key: string]: TaskType[]
}
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
export const ResultCode = {
    success: 0,
    error: 1,
    captcha: 10
} as const

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type AddTaskArgs = {
    title: string
    todolistId: string
}


export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId: number }>>('auth/login', data)
    },
    me() {
        return instance.get<ResponseType<{ id: number; email: string, login: string }>>('auth/me')
    },
    logout() {
        return instance.delete<ResponseType<{ userId?: number }>>('auth/login')
    }
}
export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title: title })
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType<{ item: TodolistType }>>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType<{ item: TodolistType }>>(`todo-lists/${id}`, { title: title })
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {

        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(args: AddTaskArgs) {
        const {todolistId, title} = args
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title })
    },
    updateTask(taskId: string, model: UpdateTaskModelType, todolistId: string) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}