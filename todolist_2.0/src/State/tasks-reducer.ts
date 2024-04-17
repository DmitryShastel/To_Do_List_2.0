import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from "../api/todolists-api";
import {TasksType} from "../AppWithRedux/AppWithRedux";
import {Dispatch} from "redux";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    status: TaskStatuses
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
    | ChangeTaskStatusActionType
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
            let newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistId,
                description: '',
                startDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                addedDate: ''
            }
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            };
        }
        case 'CHANGE-TASK-STATUS': {
            const taskIndex = state[action.todolistId].findIndex(t => t.id === action.taskId);
            if (taskIndex === -1) {
                return state; // Если задача не найдена, возвращаем исходное состояние
            }
            const updatedTasks = [...state[action.todolistId]];
            updatedTasks[taskIndex] = {...updatedTasks[taskIndex], status: action.status};
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
            return {[action.todolistId]: [], ...state}
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
export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        todolistId,
        title
    }
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistId,
        taskId,
        status
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
    return (dispatch: Dispatch<SetTasksActionType>) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTaskAC(res.data.items, todolistId))
            })
    }
}