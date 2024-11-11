import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../State/store";
import {useCallback} from "react";
import {removeTask, updateTask} from "../../features/TodolistList/model/tasksSlice";
import {
    changeTodolistFilter,
    changeTodolistTitle,
    FilterType,
    removeTodolist,
    TodolistDamainType
} from "../../features/TodolistList/model/todolistsSlice";
import {v1} from "uuid";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {TaskStatuses, TasksType} from "../../features/TodolistList/api/tasksApi.types";


export const useAppWithRedux = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDamainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()

    let changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(updateTask({taskId,title, todolistId}));
    }, []);
    let changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTask({taskId, status, todolistId}))
    }, []);
    let removeTaskCallback = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTask({todolistId, taskId}))
    }, []);
    let addTask = useCallback((todolistId: string, taskTitle: string) => {

        const action =
            {
            todoListId: todolistId,
            id: v1(),
            status: TaskStatuses.New,
            addedDate: '',
            order: 0,
            priority: 0,
            deadline: '',
            title: taskTitle,
            description: '',
            startDate: ''
        }
        //@ts-ignore
        dispatch(addTaskAC(action))
    }, []);


    let removeTodolistCallback = useCallback((todolistsId: string) => {
        //@ts-ignore
        dispatch(removeTodolist({todolistsId}))
    }, []);

    let addTodolist = useCallback((title: string) => {
        //@ts-ignore
        dispatch(addTodolist({
            todolist: {
                id: v1(),
                title: title,
                order: 0,
                addedDate: ''
            }
        }))
    }, []);

    let changeTodolistTitleCallback = useCallback((todolistsId: string, newTitle: string) => {
        //@ts-ignore
        dispatch(changeTodolistTitle({id: todolistsId, title: newTitle}))
    }, []);
    let changeFilter = useCallback((todolistId: string, value: FilterType) => {
        dispatch(changeTodolistFilter({id: todolistId, filter: value}))
    }, []);


    return {
        todolists,
        tasks,
        changeTaskTitle,
        removeTaskCallback,
        addTask,
        changeStatus,
        removeTodolistCallback,
        addTodolist,
        changeTodolistTitle,
        changeFilter
    }
};