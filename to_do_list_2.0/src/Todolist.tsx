import React, {useState} from "react";
import {FilterType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
}

export const Todolist = (props: PropsType) => {

    let [title, setTitle] = useState('')
    
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button onClick={() => {props.addTask(title)}}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => <li key={t.id}>
                    <input type='checkbox' checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => {props.removeTask(t.id)}}>x</button>
                </li>)}
            </ul>
            <div>
                <button onClick={() => {props.changeFilter('all')}}>All</button>
                <button onClick={() => {props.changeFilter('active')}}>Active</button>
                <button onClick={() => {props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>


    )
}