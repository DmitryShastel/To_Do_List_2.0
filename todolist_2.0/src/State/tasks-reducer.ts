import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {TasksType} from "../AppWithRedux/AppWithRedux";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
export type UpateTaskActionType = {
    type: 'UPDATE-TASK'
    taskId: string
    model: UpdateDomainTaskModelType
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: TaskType[]
    todolistId: string
}


type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | UpateTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const InitialState: TasksType = {}


export const tasksReducer = (state: TasksType = InitialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            const updatedTasks = state[action.todolistId].filter(t => t.id !== action.taskId)
            return {
                ...state, [action.todolistId]: updatedTasks
            }
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId]
            const newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy
        }
        case 'UPDATE-TASK': {
            const taskIndex = state[action.todolistId].findIndex(t => t.id === action.taskId);
            if (taskIndex === -1) {
                return state; // Если задача не найдена, возвращаем исходное состояние
            }
            const updatedTasks = [...state[action.todolistId]];
            updatedTasks[taskIndex] = {...updatedTasks[taskIndex], ...action.model};
            return {
                ...state,
                [action.todolistId]: updatedTasks
            };
        }
        case 'CHANGE-TASK-TITLE' : {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {[action.todolist.id]: [], ...state}
        }
        case 'REMOVE-TODOLIST' : {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state};

            action.todolists.forEach(tl => {
                copyState[tl.id] = []; // Создаем пустой массив для каждого todolist
            });

            return copyState;
        }
        case 'SET-TASKS': {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }

        default:
            return state
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        title,
        todolistId,
    }
}
export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        todolistId,
        taskId
    }
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        task
    }
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpateTaskActionType => {
    return {
        type: 'UPDATE-TASK',
        taskId,
        model,
        todolistId
    }
}

export const setTaskAC = (tasks: TaskType[], todolistId: string): SetTasksActionType => {
    return {
        type: "SET-TASKS",
        tasks,
        todolistId
    }
}
export const fetchTaskTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTaskAC(res.data.items, todolistId))
            })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }
}
export const addTaskTC = (todolistId: string, taskTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {

    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

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
}
