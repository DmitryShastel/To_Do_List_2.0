import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../State/store";
import {useCallback} from "react";
import {addTaskAC, removeTaskAC, updateTaskTC} from "../../State/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterType,
    removeTodolistAC,
    TodolistDamainType
} from "../../State/todolists-reducer";
import {TaskStatuses, TasksType} from "../../api/todolists-api";
import {v1} from "uuid";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";


export const useAppWithRedux = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDamainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()

    let changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {title: title}, todolistId));
    }, []);
    let changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {status}, todolistId))
    }, []);
    let removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC({todolistId, taskId}))
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


    let removeTodolist = useCallback((todolistsId: string) => {
        dispatch(removeTodolistAC({id: todolistsId}))
    }, []);

    let addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC({
            todolist: {
                id: v1(),
                title: title,
                order: 0,
                addedDate: ''
            }
        }))
    }, []);

    let changeTodolistTitle = useCallback((todolistsId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC({id: todolistsId, title: newTitle}))
    }, []);
    let changeFilter = useCallback((todolistId: string, value: FilterType) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter: value}))
    }, []);


    return {
        todolists,
        tasks,
        changeTaskTitle,
        removeTask,
        addTask,
        changeStatus,
        removeTodolist,
        addTodolist,
        changeTodolistTitle,
        changeFilter
    }
};