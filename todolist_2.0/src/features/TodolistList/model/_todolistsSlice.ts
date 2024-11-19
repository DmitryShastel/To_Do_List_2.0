export {}

// import {todolistsApi} from "../api/todolistsApi";
// import {RequestStatusType} from "../../../State/appSlice";
// import {asyncThunkCreator, buildCreateSlice, createSlice, PayloadAction} from "@reduxjs/toolkit";
// import {clearTasksAndTodolists} from "../../../common/actions/common.actions";
// import {createAppAsyncThunk} from "../../../common/utils/create.app.asynk.thunk";
// import {thunkTryCatch} from "../../../common/utils/thunkTryCatch";
// import {TodolistType} from "../api/todolistsApi.types";
// import {ResultCode} from "../api/tasksApi.types";
//
//
//
// //createAppAsyncThunk
//
//
// export type FilterType = 'all' | 'active' | 'completed'
// export type TodolistDamainType = TodolistType & {
//     filter: FilterType
//     entityStatus: RequestStatusType
// }
//
//
//
// const slice = createSlice({
//     name: ' todolists',
//     initialState: [] as TodolistDamainType[],
//     reducers: {
//         changeTodolistFilter(state, action: PayloadAction<{ id: string, filter: FilterType }>) {
//             const index = state.findIndex(tl => tl.id === action.payload.id)
//             state[index].filter = action.payload.filter
//         },
//         changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
//             const index = state.findIndex(tl => tl.id === action.payload.id)
//             state[index].entityStatus = action.payload.status
//         },
//     },
//
//     extraReducers: builder => {
//         builder.addCase(clearTasksAndTodolists, (state, action) => {
//             return action.payload.todolists;
//         });
//
//         builder.addCase(fetchTodolists.fulfilled, (state, action) => {
//             return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
//         })
//         builder.addCase(fetchTodolists.rejected, (state, action) => {
//         })
//         builder.addCase(removeTodolist.fulfilled, (state, action) => {
//             const index = state.findIndex(tl => tl.id === action.payload.id)
//             if (index > -1) {
//                 state.splice(index, 1)
//             }
//         })
//         builder.addCase(addTodolist.fulfilled, (state, action) => {
//             state.unshift({...action.payload.todolist, filter: "all", entityStatus: 'idle'})
//         })
//         builder.addCase(addTodolist.rejected, (state, action) => {
//         })
//
//         builder.addCase(changeTodolistTitle.fulfilled, (state, action) => {
//             const index = state.findIndex(tl => tl.id === action.payload.id)
//             state[index].title = action.payload.title
//         })
//         builder.addCase(changeTodolistTitle.rejected, (state, action) => {
//         })
//
//     }
// })
//
//
// export const {
//     changeTodolistFilter,
// } = slice.actions
//
//
// export const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }>(`${slice.name}/fetchTdolist`,
//     async () => {
//         const res = await todolistsApi.getTodolists()
//         return {todolists: res.data}
//     })
//
// export const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(`${slice.name}/addTodolist`,
//     async (title: string, {rejectWithValue}) => {
//         const res = await todolistsApi.createTodolist(title)
//         if (res.data.resultCode === ResultCode.success) {
//             return {todolist: res.data.data.item}
//         } else {
//             return rejectWithValue(res.data)
//         }
//     })


// export const removeTodolist = createAppAsyncThunk<{ id: string }, string>(`${slice.name}/removeTodolist`,
//     async (id, {dispatch, rejectWithValue}) => {
//         dispatch(todolistActions.changeTodolistEntityStatusAC({id, status: 'loading'}))
//         const res = await todolistsApi.deleteTodolist(id).finally(() => {
//             dispatch(todolistActions.changeTodolistEntityStatusAC({id, status: 'idle'}))
//         })
//         if (res.data.resultCode === ResultCode.success) {
//             return {id}
//         } else {
//             return rejectWithValue(res.data)
//         }
//     })


// export const changeTodolistTitle = createAppAsyncThunk(`${slice.name}/changeTodolistTitle`,
//     async (arg: { todolistId: string, newTitle: string }, thunkAPI) => {
//         return thunkTryCatch(thunkAPI, async () => {
//             await todolistsApi.updateTodolist(arg.todolistId, arg.newTitle)
//             return {id: arg.todolistId, title: arg.newTitle}
//         })
//     })
//
// export const todolistsSlice = slice.reducer
// export const todolistActions = slice.actions
// export const todolistThunks = {fetchTodolists, addTodolist, removeTodolist, changeTodolistTitle}
// //export const {selectTodolists} = slice.selectors
// export const todolistsPath = slice.reducerPath