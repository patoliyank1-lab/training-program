import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../Types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";


export interface initialType{
    userData:User[];
    allUserData:User[];
    error?: string;
    status:string;
    loadedData: number;
    loadedLimit:number;
}

const initialState:initialType = {
    userData: [],
    allUserData: [],
    error:'',
    status:'',
    loadedData:0,
    loadedLimit:6,
}


const fetchUserData = createAsyncThunk('userData', async (_, thunkAPI) => {
    try {
        const store = thunkAPI.getState() as RootState; 
        const skip: number = store.userStore.loadedData
        const limit: number = store.userStore.loadedLimit
        
        const response = await axios.get(`https://dummyjson.com/users?limit=${limit}&&skip=${skip}&&delay=500`);
        const responseUserData = response.data.users;
     

    return responseUserData;
    } catch (error){
        return thunkAPI.rejectWithValue(error);
    }
})


const userSlice = createSlice({
    name:'userSlice',
    initialState,
    reducers:{
        RESET(state){
        state.userData =  [];
        state.error = '';
        state.status = '';
        },

    
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUserData.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
            state.error = undefined;
            state.status = 'success';
            state.userData = action.payload;  
            state.allUserData.push(...action.payload)
            console.log(state.allUserData);
            
            const temp = JSON.parse(JSON.stringify(state.allUserData));
            state.loadedData = temp.length
                    
            
        })
        .addCase(fetchUserData.rejected, (state, action) => {
            state.error = action.error.message;
            state.status = 'failed'
        })
    },
})

export default userSlice.reducer;
export {fetchUserData };
// export const { LOAD } = userSlice.actions 