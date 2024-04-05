import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../State/store";
import {useCallback} from "react";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../State/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../../State/todolists-reducer";
import {FilterType, TasksType, TodolistsType} from "../AppWithRedux";


export const useAppWithRedux = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()

    let changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId));
    }, []) ;
    let removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, []) ;
    let addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, []);
    let changeStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }, []);
    let removeTodolist = useCallback((todolistsId: string) => {
        dispatch(removeTodolistAC(todolistsId))
    }, []) ;
    let addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, []);
    let changeTodolistTitle = useCallback((todolistsId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistsId, newTitle))
    }, []);
    let changeFilter = useCallback((todolistId: string, value: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
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
