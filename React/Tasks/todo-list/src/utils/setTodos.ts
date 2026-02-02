import { getData, storeData } from "../hooks/useLocalStorage";
import type { Todo } from "../types/Todos";




export const setTodos = (title :string, description :string, priority :string, category :string, dueDate:string) => {
    console.log(title, description, priority, category, dueDate);
    
    
    const Todos =  getData("todoList");
 
if(description === null){
    description = "";
}
if(priority === null){
    priority = "low";
}
    const newTodo: Todo = {
        id: idGen(10),
        title: title,
        description: description,
        priority: priority as "high" | "medium" | "low",
        category: category  as "work" | "personal" | "shopping" | "health" | "other",
        isCompleted: false,
        isStarred: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
        dueDate: dueDate,
    }


    Todos.push(newTodo);
    storeData("todoList", Todos);
   

    function idGen(length: number) {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;

    let id: number;

    do {
        id = Math.floor(Math.random() * (max - min) + min);
    } while (Todos.find((todo : Todo) => Number(todo.id) === id));

    return id.toString();
}

};



