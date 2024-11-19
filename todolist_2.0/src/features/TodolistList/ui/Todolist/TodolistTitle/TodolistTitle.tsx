import React from 'react';
import {EditableSpan} from "../../../../../components/EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useAppDispatch} from "../../../../../hooks/useAppDispatch";
import {TodolistDamainType, todolistsActions} from "../../../model/todolistsSlice";


type Props = {
    todolist: TodolistDamainType
}

export const TodolistTitle = ({todolist}: Props) => {

    const dispatch = useAppDispatch()
    const {id} = todolist

    const removeTodolistHandler = () => {
        dispatch(todolistsActions.removeTodolist(id))
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        dispatch(todolistsActions.changeTodolistTitle({todolistId: id, newTitle}))
    }

    return (
        <>
            <h3><EditableSpan onChange={changeTodolistTitleHandler} title={todolist.title}/>
                <IconButton disabled={todolist.entityStatus === 'loading'}>
                    <Delete onClick={removeTodolistHandler}/>
                </IconButton>
            </h3>

        </>
    );
};