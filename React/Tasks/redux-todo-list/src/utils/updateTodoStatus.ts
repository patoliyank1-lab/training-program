import { getData, storeData } from "../hooks/useLocalStorage";
import type { Todo } from "../types/Todos";

export const toggleTodoCompletion = (todoId: string) => {
    const todos: Todo[] = getData("todoList");

    const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
            return {
                ...todo,
                isCompleted: !todo.isCompleted,
                completedAt: !todo.isCompleted ? new Date().toISOString() : null,
            };
        }
        return todo;
    });

    storeData("todoList", updatedTodos);
};
