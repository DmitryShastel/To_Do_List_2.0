import {ResultCode, todolistsAPI, TodolistType} from "../common/api/todolists-api";
import {RequestStatusType} from "./app-reduser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../common/actions/common.actions";
import {createAppAsyncThunk} from "../common/utils/create.app.asynk.thunk";
import {handleServerAppError} from "../common/utils/handle-server-app-error";
import {thunkTryCatch} from "../common/utils/thunkTryCatch";


export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDamainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}


const slice = createSlice({
    name: ' todolists',
    initialState: [] as TodolistDamainType[],
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
    },

    extraReducers: builder => {
        builder.addCase(clearTasksAndTodolists, (state, action) => {
            return action.payload.todolists;
        });

        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        })
        builder.addCase(fetchTodolists.rejected, (state, action) => {
        })
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        builder.addCase(addTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: 'idle'})
        })
        builder.addCase(addTodolist.rejected, (state, action) => {
        })

        builder.addCase(changeTodolistTitle.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        })
        builder.addCase(changeTodolistTitle.rejected, (state, action) => {
        })

    }
})


export const todolistsReducer = slice.reducer
export const {
    changeTodolistFilterAC,
} = slice.actions


export const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(`${slice.name}/addTodolist`,
    async (title: string, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        return thunkTryCatch(thunkAPI, async () => {
            const res = await todolistsAPI.createTodolist(title)
            if (res.data.resultCode === ResultCode.success) {
                return {todolist: res.data.data.item}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        })
    })


export const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }>(`${slice.name}/fetchTdolist`,
    async (_, thunkAPI) => {
        return thunkTryCatch(thunkAPI, async () => {
            const res = await todolistsAPI.getTodolists()
            return {todolists: res.data}
        })
    })

export const removeTodolist = createAppAsyncThunk<{ id: string }, { todolistId: string }>(`${slice.name}/removeTodolist`,
    async (arg: { todolistId: string }, thunkAPI) => {
        const res = await todolistsAPI.deleteTodolist(arg.todolistId)
        return {id: arg.todolistId}
    })


export const changeTodolistTitle = createAppAsyncThunk(`${slice.name}/changeTodolistTitle`,
    async (arg: { todolistId: string, newTitle: string }, thunkAPI) => {
        return thunkTryCatch(thunkAPI, async () => {
            await todolistsAPI.updateTodolist(arg.todolistId, arg.newTitle)
            return {id: arg.todolistId, title: arg.newTitle}
        })
    })