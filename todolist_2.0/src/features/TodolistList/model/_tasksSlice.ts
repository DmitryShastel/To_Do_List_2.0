import { FilterType,  todolistsActions} from "./todolistsSlice";
import {appActions} from "../../../State/appSlice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists, ClearTasksAndTodolistsType} from "../../../common/actions/common.actions";
import {createAppAsyncThunk} from "../../../common/utils/create.app.asynk.thunk";
import {handleServerAppError} from "../../../common/utils/handle-server-app-error";
import {thunkTryCatch} from "../../../common/utils/thunkTryCatch";
import {
    AddTaskArgs,
    TaskPriorities,
    TaskStatuses,
    TasksType,
    TaskType,
    UpdateTaskModelType
} from "../api/tasksApi.types";
import {taskApi} from "../api/tasksApi";



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
        builder.addCase(todolistsActions.addTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        })
        builder.addCase(todolistsActions.removeTodolist.fulfilled, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(todolistsActions.fetchTodolists.fulfilled, (state, action: any) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = [];
            });
        })
        builder.addCase(clearTasksAndTodolists.type, (state, action: PayloadAction<ClearTasksAndTodolistsType>) => {
                return action.payload.tasks
            }
        )
    },
    selectors: {
        selectTasks: (state) => state,
        selectFilteredTasks: (state, todolistId: string, filter: FilterType) => {
            let tasks = state[todolistId]

            // const {id, filter} = todolist

            if (filter === 'completed') {
                tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
            }
            if (filter === 'active') {
                tasks = tasks.filter(t => t.status === TaskStatuses.New)
            }

            return tasks
        }
    }
})


export const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgs>(`${slice.name}/addTask`,
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        return thunkTryCatch(thunkAPI, async () => {
            const res = await taskApi.createTask(arg)
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                return {task}
            } else {
                handleServerAppError(res.data, dispatch, false)
                return rejectWithValue(res.data)
            }
        })
    })


export const fetchTasks = createAppAsyncThunk<{
    tasks: TaskType[],
    todolistId: string
},
    string>(`${slice.name}/fetchTasks`,
    async (todolistId, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI

        return thunkTryCatch(thunkAPI, async () => {
            const res = await taskApi.getTasks(todolistId)
            const tasks = res.data.items
            return {tasks, todolistId}
        })
    })


export const updateTask = createAppAsyncThunk<any, any>
(`${slice.name}/updateTask`, async (arg, thunkAPI) => {

    const {dispatch, rejectWithValue, getState} = thunkAPI

    return thunkTryCatch(thunkAPI, async () => {
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

        const res = await taskApi.updateTask(arg.taskId, apiModel, arg.todolistId)
        if (res.data.resultCode === 0) {
            return {taskId: arg.taskId, model: arg.domainModel, todolistId: arg.todolistId}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    })
})

export const removeTask = createAppAsyncThunk(`${slice.name}/removeTask`,
    async (arg: { todolistId: string, taskId: string }, thunkAPI) => {
        const res = await taskApi.deleteTask(arg.todolistId, arg.taskId)
        return {todolistId: arg.todolistId, taskId: arg.taskId}
    })


export const tasksReducer = slice.reducer
export const taskThunks = {updateTask, fetchTasks, addTask, removeTask}
export const {selectTasks, selectFilteredTasks} = slice.selectors