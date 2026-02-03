import { getData } from "../hooks/useLocalStorage";
import type { Todo } from "../types/Todos";


export function getDataByCategory(category: string, priority?: string, status?: string): Todo[] {
    const data: Todo[] = getData('todoList');
    let filteredData = data.filter((todo) => todo.category === category)

    if (priority) {
        filteredData = filteredData.filter(todo => todo.priority === priority);
    }

    if (status) {
        if (status === 'pending') {
            filteredData = filteredData.filter(todo => !todo.isCompleted);
        } else if (status === 'completed') {
            filteredData = filteredData.filter(todo => todo.isCompleted);
        }
    }

    return filteredData;
}
