import {addTodolist,  fetchTodolists, removeTodolist} from "./todolists-reducer";
import {
    AddTaskArgs,
    TaskPriorities,
    TaskStatuses,
    TasksType,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from "../common/api/todolists-api";
import {appActions, setAppStatusAC} from "./app-reduser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists, ClearTasksAndTodolistsType} from "../common/actions/common.actions";
import {createAppAsyncThunk} from "../common/utils/create.app.asynk.thunk";
import {handleServerAppError} from "../common/utils/handle-server-app-error";
import {handleServerNetworkError} from "../common/utils/handle-server-network-error";


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type UpdateTaskArg = {
    todolistId: string;
    taskId: string;
    domainModel: UpdateTaskModelType;
}

const InitialState: TasksType = {}


const slice = createSlice({
    name: 'tasks',
    initialState: InitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        builder.addCase(fetchTasks.rejected, (state, action) => {
        })
        builder.addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        })
        builder.addCase(addTask.rejected, (state, action) => {
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
        builder.addCase(updateTask.rejected, (state, action) => {
        })
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })

        builder.addCase(addTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        })
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = [];
            });
        })
        builder.addCase(clearTasksAndTodolists.type, (state, action: PayloadAction<ClearTasksAndTodolistsType>) => {
                return action.payload.tasks
            }
        )
    },
})

export const fetchTasks = createAppAsyncThunk<{
    tasks: TaskType[],
    todolistId: string
},
    string>(`${slice.name}/fetchTasks`,
    async (todolistId, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(setAppStatusAC({status: 'loading'}))
            const res = await todolistsAPI.getTasks(todolistId)
            const tasks = res.data.items
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {tasks, todolistId}
        } catch (err: any) {
            handleServerAppError(err, dispatch)
            return rejectWithValue(null)
        }
    })


export const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgs>(`${slice.name}/addTask`,
    async (arg, thunkAPI) => {

        const {dispatch, rejectWithValue} = thunkAPI

        try {
            dispatch(setAppStatusAC({status: 'loading'}))
            const res = await todolistsAPI.createTask(arg)
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return {task}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (err: any) {
            handleServerAppError(err, dispatch)
            return rejectWithValue(null)
        }
    })

export const updateTask = createAppAsyncThunk<any, any>
(`${slice.name}/updateTask`, async (arg, thunkAPI) => {

    const {dispatch, rejectWithValue, getState} = thunkAPI

    try {
        const state = getState()
        const task = state.tasks[arg.todolistId].find(t => t.id === arg.taskId)
        if (!task) {
            dispatch(appActions.setAppErrorAC({error: 'Task not found'}))
            return rejectWithValue(null)
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...arg.domainModel
        }

        const res = await todolistsAPI.updateTask(arg.taskId, apiModel, arg.todolistId)
        if (res.data.resultCode === 0) {
            return {taskId: arg.taskId, model: arg.domainModel, todolistId: arg.todolistId}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

export const removeTask = createAppAsyncThunk(`${slice.name}/removeTask`,
    async (arg: { todolistId: string, taskId: string }, thunkAPI) => {
        const res = await todolistsAPI.deleteTask(arg.todolistId, arg.taskId)
        return {todolistId: arg.todolistId, taskId: arg.taskId}
    })


export const tasksReducer = slice.reducer