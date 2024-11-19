import {todolistsApi} from "../api/todolistsApi";
import {appActions, RequestStatusType} from "../../../State/appSlice";
import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../../common/actions/common.actions";
import {TodolistType} from "../api/todolistsApi.types";
import {ResultCode} from "../api/tasksApi.types";
import {handleServerNetworkError} from "../../../common/utils/handle-server-network-error";
import {AppDispatch} from "../../../State/store";


//RTK-2.0

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDamainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}


const createAppSlice = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator},
})


const slice = createAppSlice({
    name: ' todolists',
    initialState: [] as TodolistDamainType[],
    reducers: (creators) => {
        return {
            removeTodolist: creators.asyncThunk<{ id: string }, string>(
                async ( id,     { dispatch, rejectWithValue}) => {
                    dispatch(todolistsActions.changeTodolistEntityStatus({id, status: 'loading'}))
                    const res = await todolistsApi.deleteTodolist(id).finally(() => {
                        dispatch(todolistsActions.changeTodolistEntityStatus({id, status: 'idle'}))
                    })
                    if (res.data.resultCode === ResultCode.success) {
                        return {id}
                    } else {
                        return rejectWithValue(res.data)
                    }
                }, {
                    fulfilled: (state, action) => {
                        const index = state.findIndex(tl => tl.id === action.payload.id)
                        if (index > -1) {
                            state.splice(index, 1)
                        }
                    }
                }),

            changeTodolistTitle: creators.asyncThunk<{ id: string; title: string }, { todolistId: string, newTitle: string }>(
                async (arg: { todolistId: string, newTitle: string }, thunkAPI) => {
                    await todolistsApi.updateTodolist(arg.todolistId, arg.newTitle)
                    return {id: arg.todolistId, title: arg.newTitle}
                },
                {
                    fulfilled: (state, action) => {
                        const index = state.findIndex(tl => tl.id === action.payload.id)
                        state[index].title = action.payload.title
                    }
                }
            ),

            addTodolist: creators.asyncThunk<any, any>(
                async (title: string, {dispatch, rejectWithValue}) => {
                    const appDispatch = dispatch as AppDispatch
                    const res = await todolistsApi.createTodolist(title)
                    if (res.data.resultCode === ResultCode.success) {
                        return {todolist: res.data.data.item}
                    } else {
                        handleServerNetworkError(res.data.messages[0], appDispatch)
                        return rejectWithValue(res.data)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state.unshift({...action.payload.todolist, filter: "all", entityStatus: 'idle'})
                    }
                }),

            fetchTodolists: creators.asyncThunk(
                async (_, {dispatch, rejectWithValue}) => {
                    const appDispatch = dispatch as AppDispatch
                    try {
                        dispatch(appActions.setAppStatusAC({status: 'loading'}))
                        const res = await todolistsApi.getTodolists()
                        dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
                        return {todolists: res.data}
                    } catch (e: any) {
                        handleServerNetworkError(e, appDispatch)
                        return rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
                    }
                },
            ),


            changeTodolistFilter: creators.reducer((state, action: PayloadAction<{ id: string, filter: FilterType }>) => {
                    const index = state.findIndex(tl => tl.id === action.payload.id)
                    state[index].filter = action.payload.filter
                },
            ),
            changeTodolistEntityStatus: creators.reducer((state, action: PayloadAction<{ id: string, status: RequestStatusType }>) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].entityStatus = action.payload.status
            }),

        }

    },
    extraReducers: builder => {
        builder.addCase(clearTasksAndTodolists, (state, action) => {
            return action.payload.todolists;
        });
    }
})


export const {
    changeTodolistFilter,
} = slice.actions


export const todolistsReducer = slice.reducer
//export const todolistActions = slice.actions
export const todolistsActions = slice.actions
//export const todolistThunks = {fetchTodolists, addTodolist, removeTodolist, changeTodolistTitle}
//export const {fetchTodolists, addTodolist, removeTodolist, changeTodolistTitle} = slice.actions
//export const {selectTodolists} = slice.selectors
//export const todolistsPath = slice.reducerPath