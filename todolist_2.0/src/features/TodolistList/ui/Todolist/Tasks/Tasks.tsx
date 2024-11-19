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