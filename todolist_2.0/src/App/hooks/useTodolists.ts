import {useState} from "react";
import {todolistId1, todolistId2} from "../id-utils";
import {FilterType, TodolistsType} from "../App";
import {v1} from "uuid";

export const useTodolists = (onTodolistRemoved: (todolistsId: string) => void, onToDolistAdded:(todolistsId: string)=> void ) => {
    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    let removeTodolist = (todolistsId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistsId))
        onTodolistRemoved(todolistsId)
    }

    let addTodolist = (title: string) => {
        let newTodolistId = v1();
        let newTodolist: TodolistsType = {id: newTodolistId, title: title, filter: 'all'}
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