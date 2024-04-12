import {useEffect, useState} from "react";
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.createTodolist('test title')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'dba52437-4e2c-4246-a7a1-51c50495fe82'
    useEffect(() => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'dba52437-4e2c-4246-a7a1-51c50495fe82'
    useEffect(() => {
        todolistsAPI.updateTodolist(todolistId, 'changed title')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = ''
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTask = () => {
        const todolistId = ''
        const taskId = ''
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
            <button onClick={deleteTask}>Delete task</button>
        </div>
    </div>
}