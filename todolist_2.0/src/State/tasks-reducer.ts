import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {
    TaskPriorities,
    TaskStatuses,
    TasksType,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTaskAC>



const InitialState: TasksType = {}


export const tasksReducer = (state: TasksType = InitialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK' :
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {[action.todolist.id]: [], ...state}
        case 'REMOVE-TODOLIST' :
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy
        case 'SET-TODOLISTS': {
            const copyState = {...state};
            action.todolists.forEach(tl => {
                copyState[tl.id] = []; // Создаем пустой массив для каждого todolist
            });
            return copyState;
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

//actions
export const removeTaskAC = (todolistId: string, taskId: string) => ({
    type: 'REMOVE-TASK',
    todolistId,
    taskId
} as const)
export const addTaskAC = (task: TaskType) => ({
    type: 'ADD-TASK',
    task
} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
    type: 'UPDATE-TASK',
    taskId,
    model,
    todolistId
} as const)
export const setTaskAC = (tasks: TaskType[], todolistId: string) => ({
    type: "SET-TASKS",
    tasks,
    todolistId
} as const)

//thunks
export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTaskAC(res.data.items, todolistId))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}
export const addTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTask(todolistId, taskTitle)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {

    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
        console.warn('task not found in the state')
        return
    }

    const apiModel: UpdateTaskModelType = {
        title: task.title,
        status: task.status,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        ...domainModel
    }

    todolistsAPI.updateTask(taskId, apiModel, todolistId)
        .then(res => {
            dispatch(updateTaskAC(taskId, domainModel, todolistId))
        })
}