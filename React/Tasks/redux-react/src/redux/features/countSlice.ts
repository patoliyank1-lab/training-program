import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const promise : Promise<number> = new Promise((resolve, rejected)=>{
    setTimeout(()=>{resolve(20)},5000)
    setTimeout(()=>{rejected()},1000)
})

export const asyncFunction = createAsyncThunk('async/1',  async (_, thunkAPI) =>{

    try {
        const response = await promise;
        return response; 
    } catch (error:unknown){
        return thunkAPI.rejectWithValue(error)
    }
})


interface initTYpe{
      value:number,
        status: string,
        data:number,
        error?:object | null,
}

const  initialState: initTYpe ={
        value:0,
        status: '',
        data:-1,
        error:{},

    };
// asyncFunction();

const counterSlice = createSlice({
    name:'num',
    initialState,
    reducers:{
        increment: state => {
            state.value += 1;
        },
        decrement: state => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
        decrementByAmount: (state, action) => {
            state.value -= action.payload;
        }
    },
    extraReducers:(builder) =>{
        builder
        .addCase(asyncFunction.pending, (state)=>{
            state.status = 'pending';
            state.error = null;
        })
        .addCase(asyncFunction.fulfilled, (state, action)=>{
            state.status = 'fulfilled';
            state.data = action.payload;
        })
        .addCase(asyncFunction.rejected, (state, action)=>{
            state.status = 'rejected';
            state.error = action.payload || action.error.message;
        })
    }
  
})

export const {increment, decrement, incrementByAmount, decrementByAmount    } = counterSlice.actions
export default counterSlice.reducer;
export {promise};
