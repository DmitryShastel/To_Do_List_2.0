import {addTodolistAC, TodolistDamainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksType} from "./AppWithReducer";
import {TodolistType} from "../api/todolists-api";
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodolistDamainType> = [];

    const newTodolist: TodolistType = {
        id: v1(),
        title: "new todolist",
        addedDate: '',
        order: 0
    };

    const action = addTodolistAC(newTodolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});
