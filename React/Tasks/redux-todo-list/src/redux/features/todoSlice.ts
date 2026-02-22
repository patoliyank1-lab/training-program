import { createSlice } from '@reduxjs/toolkit'
import type { Todo } from '../../types/Todos'
import { getTodoByUserId } from '../../utils/TodoFilters';

interface initialType {
    work :{
        Pending:Todo[]
        Completed:Todo[]
    };
    personal :{
        Pending:Todo[]
        Completed:Todo[]
    };
    shopping : {
        Pending:Todo[]
        Completed:Todo[]
    };
    health : {
        Pending:Todo[]
        Completed:Todo[]
    };
    other : {
        Pending:Todo[]
        Completed:Todo[]
    };
}


const initialState : initialType = {
    work :{
        Pending:[],
        Completed:[],
    },
    personal :{
        Pending:[],
        Completed:[],
    },
    shopping : {
        Pending:[],
        Completed:[],
    },
    health : {
        Pending:[],
        Completed:[],
    },
    other : {
        Pending:[],
        Completed:[],
    },
}

const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,
    reducers:{
        RESET(state){
            state.work.Completed=[];
            state.work.Pending=[];
            state.personal.Completed=[];
            state.personal.Pending=[];
            state.shopping.Completed=[];
            state.shopping.Pending=[];
            state.health.Completed=[];
            state.health.Pending=[];
            state.other.Completed=[];
            state.other.Pending=[];
        },
        StoreTODO(state, action){            
            const newTODO : Todo = action.payload.tempTodo;
            const uId = action.payload.uId
            if(newTODO.isCompleted){
                const tempTodoList :Todo[] = JSON.parse(JSON.stringify(state[newTODO.category].Completed));
                tempTodoList.push(newTODO);
                state[newTODO.category].Completed = tempTodoList;
            }else{
                const tempTodoList :Todo[] = JSON.parse(JSON.stringify(state[newTODO.category].Pending));
                tempTodoList.push(newTODO);
                state[newTODO.category].Pending = tempTodoList;
            }
            localStorage.setItem(`TodoStore-${uId}`, JSON.stringify(state))
        },

        getState(state,action){
            
            
            const tempData = getTodoByUserId(action.payload);
            
            if(tempData){
                state = JSON.parse(tempData);
            }
            return state
        },

        updateTodo(state, action){
            const tempTodo : Todo = action.payload.tempTodo;
            const uId = action.payload.uId;
            if(tempTodo.isCompleted){
                const tempTodoList :Todo[] = JSON.parse(JSON.stringify(state[tempTodo.category].Completed));
                const  index =  tempTodoList.findIndex((todo) => (todo.id) === (tempTodo.id))
                tempTodoList[index] = tempTodo;
                state[tempTodo.category].Completed = tempTodoList;
            }else{
                const tempTodoList :Todo[] = JSON.parse(JSON.stringify(state[tempTodo.category].Pending));
                const  index =  tempTodoList.findIndex((todo) => todo.id == tempTodo.id)
                tempTodoList[index] = tempTodo;
                state[tempTodo.category].Pending = tempTodoList;
            }
            localStorage.setItem(`TodoStore-${uId}`, JSON.stringify(state))
        },

        completeTodo(state, action){
          const tempTodo : Todo = JSON.parse    (JSON.stringify(action.payload.todo));
            const uId = action.payload.uId;
            console.log(action.payload);
            
                   
            if(tempTodo.isCompleted){
                const tempTodoList :Todo[] = JSON.parse(JSON.stringify(state[tempTodo.category].Completed));
                const  index =  tempTodoList.findIndex((todo) => (todo.id) === (tempTodo.id))
                tempTodoList.splice(index,1);
                state[tempTodo.category].Completed = tempTodoList
                tempTodo.isCompleted = false;
                const tempArray = JSON.parse(JSON.stringify(state[tempTodo.category].Pending)) 
                tempArray.push(tempTodo)
                state[tempTodo.category].Pending = tempArray
                
            }else{
                const tempTodoList :Todo[] = JSON.parse(JSON.stringify(state[tempTodo.category].Pending));
                const  index =  tempTodoList.findIndex((todo) => todo.id == tempTodo.id)
                tempTodoList.splice(index,1);
                state[tempTodo.category].Pending = tempTodoList
                tempTodo.isCompleted = true;
                const tempArray = JSON.parse(JSON.stringify(state[tempTodo.category].Completed)) 
                tempArray.push(tempTodo)
                state[tempTodo.category].Completed = tempArray
            }
            localStorage.setItem(`TodoStore-${uId}`, JSON.stringify(state))
        }
    }
})


export default todoSlice.reducer;
export const { StoreTODO } = todoSlice.actions;
export const { getState } = todoSlice.actions;
export const { updateTodo } = todoSlice.actions;
export const { completeTodo } = todoSlice.actions;
export const { RESET } = todoSlice.actions;