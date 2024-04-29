import {useState} from "react";
import {todolistId1, todolistId2} from "../id-utils";
import {v1} from "uuid";
import {FilterType, TodolistDamainType} from "../../State/todolists-reducer";

export const useTodolists = (onTodolistRemoved: (todolistsId: string) => void, onToDolistAdded:(todolistsId: string)=> void ) => {
    let [todolists, setTodolists] = useState<TodolistDamainType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all',entityStatus: 'idle',  addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
    ])

    let removeTodolist = (todolistsId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistsId))
        onTodolistRemoved(todolistsId)
    }

    let addTodolist = (title: string) => {
        let newTodolistId = v1();
        let newTodolist: TodolistDamainType = {id: newTodolistId, title: title, filter: 'all', entityStatus: 'idle',  addedDate: '', order: 0}
        setTodolists([newTodolist, ...todolists])
        onToDolistAdded(newTodolistId)
    }

    let changeTodolistTitle = (id: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
    }
    let changeFilter = (todolistId: string, value: FilterType) => {

        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    return {todolists, setTodolists, removeTodolist, addTodolist, changeTodolistTitle, changeFilter}
}