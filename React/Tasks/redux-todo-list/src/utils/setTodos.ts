import type { Todo } from "../types/Todos";




export const setTodos = (title :string, description :string = '', priority :string = 'low', category :string, dueDate:string, id?:string) => {

    

    const newTodo: Todo = {
        id: id? id : Date.now().toString(),
        title: title,
        description: description,
        priority: priority as "high" | "medium" | "low",
        category: category  as "work" | "personal" | "shopping" | "health" | "other",
        isCompleted: false,
        isStarred: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
        dueDate: new Date(dueDate || '').toISOString(),
    }
   
return newTodo;

};



