import { getData } from "../hooks/useLocalStorage";
import type { Todo } from "../types/Todos";


export function getDataByCategory (category:string, priority?:string) : Todo[] {
    const data: Todo[] = getData('todoList');
    const filteredData = data.filter((todo) => todo.category === category)
    
    if(priority){
        const newData = filteredData.filter(todo => todo.priority === priority);
        return newData.filter((todo ) => todo.category === category);
    }
    return filteredData;
}
