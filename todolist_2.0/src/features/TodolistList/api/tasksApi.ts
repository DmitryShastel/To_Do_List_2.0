import {AddTaskArgs, GetTasksResponse, TaskType, UpdateTaskModelType} from "./tasksApi.types";
import { instance} from "./todolistsApi";
import {BaseResponse2} from "../../auth/api/authApi.types";


export const taskApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {

        return instance.delete<BaseResponse2>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(args: AddTaskArgs) {
        const {todolistId, title} = args
        return instance.post<BaseResponse2<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title })
    },
    updateTask(taskId: string, model: UpdateTaskModelType, todolistId: string) {
        return instance.put<BaseResponse2<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}