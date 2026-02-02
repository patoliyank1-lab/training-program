import type {Todo} from "../types/Todos"

export const storeData = (name:string, data:Array<Todo>) => {
   
    localStorage.setItem(name ,JSON.stringify(data));
    
}

export const getData = (name: string) => {
    const data = localStorage.getItem(name);
    if(data){
        return JSON.parse(data)
    }
    localStorage.setItem(name ,JSON.stringify([]));
    return []
}