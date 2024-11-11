import React from 'react';
import {Button} from "@mui/material";
import {useAppDispatch} from "../../../../../hooks/useAppDispatch";
import {changeTodolistFilter, FilterType, TodolistDamainType} from "../../../model/todolistsSlice";


type Props = {
    todolist: TodolistDamainType
}

export const FilterTasksButtons = ({todolist}: Props) => {

    const dispatch = useAppDispatch()
    const {id, filter} = todolist

    const changeTodolistHandler = (filter: FilterType) => {
        dispatch(changeTodolistFilter({id, filter: filter}))
    }


    return (
        <>
            <Button variant={todolist.filter === 'all' ? 'contained' : 'text'}
                    onClick={() => changeTodolistHandler('all')}>All
            </Button>
            <Button color={"primary"} variant={todolist.filter === 'active' ? 'contained' : 'text'}
                    onClick={() => changeTodolistHandler('active')}>Active
            </Button>
            <Button color={"secondary"} variant={todolist.filter === 'completed' ? 'contained' : 'text'}
                    onClick={() => changeTodolistHandler('completed')}>Completed
            </Button>
        </>
    );
};