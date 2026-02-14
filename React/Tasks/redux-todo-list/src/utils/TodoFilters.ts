import type { Todo } from "../types/Todos";



export function getTodoByPriority(Todos:Todo[], selectedPriority:string) : Todo[] {
        return Todos.filter((todo) => todo.priority === selectedPriority)
}

export function getTodoByUserId(id:string){
      return localStorage.getItem(`TodoStore-${id}`);
};