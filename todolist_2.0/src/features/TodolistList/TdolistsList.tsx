import React, {useCallback, useEffect} from "react";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../State/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterType,
    removeTodolistTC,
    TodolistDamainType
} from "../../State/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../../State/tasks-reducer";
import {TaskStatuses, TasksType} from "../../api/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm";
import {Todolist} from "./Todolist/Tdolist";


type TodolistPropsType = {
    // todolist: TodolistDamainType[]
}

export const TodolistList: React.FC<TodolistPropsType> = (props) => {

    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDamainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

//todolistFuns
    const addTodolist = useCallback((titleTodolist: string) => {
        dispatch(addTodolistTC(titleTodolist))
    }, [])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [])
    const changeToDoListTitle = useCallback((todolistId: string, titleTodolist: string) => {
        dispatch(changeTodolistTitleTC(todolistId, titleTodolist))
    }, [])
    const changeToDoListFilter = useCallback((todolistId: string, filter: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [])

//taskFuns
    const addTask = useCallback((todolistId: string, taskTitle: string) => {
        dispatch(addTaskTC(todolistId, taskTitle))
    }, [])
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [])
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {status}, todolistId))
    }, [])
    const changeTaskTitle = useCallback((taskId: string, taskTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {title: taskTitle}, todolistId))
    }, [])

    return (
        <>
            <Grid container style={{padding: '10px'}}>
    <AddItemForm addItem={addTodolist}/>
    </Grid>
    <Grid container spacing={3}>
        {
            todolists.map((tl) => {
                let tasksForTodolist = tasks[tl.id]

                return (
                    <Grid item>
                    <Paper style={{padding: '10px'}}>
                <Todolist
                    id={tl.id}
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeToDoListFilter}
                addTask={addTask}
                changeStatus={changeTaskStatus}
                filter={tl.filter}
                removeTodolist={removeTodolist}
                changeTodolistTitle={changeToDoListTitle}
                changeTaskTitle={changeTaskTitle}
                />
                </Paper>
                </Grid>
            )
            })
        }
        </Grid>
        </>
)
}