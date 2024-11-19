import React from 'react';
import {Task} from "./Task/Task";
import {TodolistDamainType} from "../../../model/todolistsSlice";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../State/store";
import {selectFilteredTasks} from "../../../model/tasksSlice";


type Props = {
    todolist: TodolistDamainType
}

export const Tasks = ({todolist}: Props) => {


    // const {id, filter} = todolist
    //
    //
    // if (filter === 'completed') {
    //     tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    // }
    // if (filter === 'active') {
    //     tasks = tasks.filter(t => t.status === TaskStatuses.New)
    // }

    const filteredTasks = useSelector((state: AppRootStateType) =>
        selectFilteredTasks(state, todolist.id, todolist.filter))

    return (
        <>
            {
                filteredTasks.map(t =>
                    <Task
                        task={t}
                        todolistId={todolist.id}
                        key={todolist.id}
                    />
                )
            }
        </>
    );
};