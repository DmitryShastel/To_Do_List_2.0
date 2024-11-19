import {FilterType, todolistsActions} from "./todolistsSlice";
import {appActions} from "../../../State/appSlice";
import {asyncThunkCreator, buildCreateSlice, PayloadAction} from "@reduxjs/toolkit";
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
import {AppRootStateType} from "../../../State/store";
import {clearTasksAndTodolists, ClearTasksAndTodolistsType} from "../../../common/actions/common.actions";


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

const createAppSlice = buildCreateSlice({
    creators: {asyncThunk: asyncThunkCreator},
})

const slice = createAppSlice({
    name: 'tasks',
    initialState: InitialState,
    reducers: (creators) => {
        return {
            fetchTasks: creators.asyncThunk<{
                tasks: TaskType[],
                todolistId: string
            },
                string>(async (todolistId, thunkAPI) => {
                    const {dispatch, rejectWithValue} = thunkAPI
                    return thunkTryCatch(thunkAPI, async () => {
                        const res = await taskApi.getTasks(todolistId)
                        const tasks = res.data.items
                        return {tasks, todolistId}
                    })
                },
                {
                    fulfilled: (state, action) => {
                        state[action.payload.todolistId] = action.payload.tasks
                    }
                }),

            addTask: creators.asyncThunk<{ task: TaskType }, AddTaskArgs>(
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
                },
                {
                    fulfilled: (state, action) => {
                        state[action.payload.task.todoListId].unshift(action.payload.task)
                    }
                }),
            updateTask: creators.asyncThunk<any, any, any>(
                async (arg, thunkAPI) => {
                    const {dispatch, rejectWithValue, getState} = thunkAPI

                    return thunkTryCatch(thunkAPI, async () => {
                        const state = getState() as AppRootStateType
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
                },
                {
                    fulfilled: (state, action) => {
                        const tasks = state[action.payload.todolistId];
                        const index = tasks.findIndex(t => t.id === action.payload.taskId);
                        if (index > -1) {
                            tasks[index] = {...tasks[index], ...action.payload.model}
                        }
                    }
                }),
            removeTask: creators.asyncThunk(
                async (arg: { todolistId: string, taskId: string }, thunkAPI) => {
                    const res = await taskApi.deleteTask(arg.todolistId, arg.taskId)
                    return {todolistId: arg.todolistId, taskId: arg.taskId}
                },
                {
                    fulfilled: (state, action) => {
                        const tasks = state[action.payload.todolistId];
                        const index = tasks.findIndex(t => t.id === action.payload.taskId);
                        if (index > -1) {
                            tasks.splice(index, 1)
                        }
                    }
                })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(todolistsActions.fetchTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = [];
            });
        })
        builder.addCase(todolistsActions.addTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        })

        builder.addCase(todolistsActions.removeTodolist.fulfilled, (state, action) => {
            delete state[action.payload.id]
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


export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const {selectFilteredTasks} = slice.selectors