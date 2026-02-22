import { createSlice } from "@reduxjs/toolkit";

interface initialType {
  theme: 'light' | 'dark'
}


const initialState:initialType = {
   theme: 'light',
};

const uiSlice =  createSlice({
    name:'uiSlice',
    initialState,
    reducers:{
        setLight(state){
            state.theme = 'light';
        },
        setDark(state){
            state.theme = 'dark';
        }
    }
})



export default uiSlice.reducer;
export const { setLight } = uiSlice.actions;
export const { setDark } = uiSlice.actions;