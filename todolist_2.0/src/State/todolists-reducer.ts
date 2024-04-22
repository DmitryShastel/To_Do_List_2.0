import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterType
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

type ActionsType = RemoveTodolistActionType |
    AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

const InitialState: TodolistDamainType[] = []


export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDamainType = TodolistType & {
    filter: FilterType
}

export const todolistsReducer = (state: TodolistDamainType[] = InitialState, action: ActionsType): TodolistDamainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDamainType = {...action.todolist, filter: "all"}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: "all"
                }
            })
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistsId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistsId
    }
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        todolist
    }
}
export const changeTodolistTitleAC = (todolistId: string, newTitle: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId,
        title: newTitle
    }
}
export const changeTodolistFilterAC = (todolistId: string, value: FilterType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId,
        filter: value
    }
}
export const setTodolistsAc = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {
        type: 'SET-TODOLISTS',
        todolists: todolists
    }
}


export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<SetTodolistsActionType>) => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAc(res.data))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}


export const changeTodolistTitleTC = (todolistId: string, newTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(todolistId, newTitle)
            .then(res => {
                dispatch(changeTodolistTitleAC(todolistId, newTitle))
            })
    }
}
























