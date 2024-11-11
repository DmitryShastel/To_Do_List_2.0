import React, {useEffect} from "react";
import {AddItemForm} from "../../../../components/AddItemForm";
import {TodolistDamainType} from "../../model/todolistsSlice";
import {useAppDispatch} from "../../../../hooks/useAppDispatch";
import {taskThunks} from "../../model/tasksSlice";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "./Tasks/Tasks";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";


type Props = {
    todolist: TodolistDamainType
    demo?: boolean
}

export const Todolist = ({demo = false, todolist}: Props) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(taskThunks.fetchTasks(todolist.id))
    }, [])


    const addTask = (title: string) => {
        return dispatch(taskThunks.addTask({todolistId: todolist.id, title}))
    }


    return (
        <>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTask} disabled={todolist.entityStatus === 'loading'}/>
            <Tasks todolist={todolist}/>
            <div style={{paddingTop: '10px'}}>
                <FilterTasksButtons todolist={todolist}/>
            </div>
        </>
    )
}