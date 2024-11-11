import React from 'react';
import {EditableSpan} from "../../../../../components/EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TodolistDamainType, todolistThunks} from "../../../model/todolistsSlice";
import {useAppDispatch} from "../../../../../hooks/useAppDispatch";


type Props = {
    todolist: TodolistDamainType
}

export const TodolistTitle = ({todolist}: Props) => {

    const dispatch = useAppDispatch()
    const {id} = todolist

    const removeTodolistHandler = () => {
        dispatch(todolistThunks.removeTodolist(id))
    }

    const changeTodolistTitleHandler = (newTitle: string) => {
        dispatch(todolistThunks.changeTodolistTitle({todolistId: id, newTitle}))
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