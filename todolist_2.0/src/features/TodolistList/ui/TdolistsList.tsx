import React, {useCallback, useEffect} from "react";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";
import {addTodolist, fetchTodolists,} from "../model/todolistsSlice";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../../components/AddItemForm";
import {Navigate} from "react-router-dom";
import {selectTodolists} from "../../../hooks/use.todo.selector";
import {selectIsLoggedIn} from "../../auth/ui/Login/use.login.selector";
import {useAppSelector} from "../../../State/store";
import {Todolist} from "./Todolist/Tdolist";


type TodolistPropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<TodolistPropsType> = ({demo = false, ...props}) => {

    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

    const todolists = useAppSelector(selectTodolists)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)


    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolists())
    }, [])


    const addTodolistCallback = useCallback((titleTodolist: string) => {
        return dispatch(addTodolist(titleTodolist))
    }, [])


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '10px'}}>
                <AddItemForm addItem={addTodolistCallback}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map((tl) => {
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        todolist={tl}
                                        key={tl.id}
                                        demo={demo}
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