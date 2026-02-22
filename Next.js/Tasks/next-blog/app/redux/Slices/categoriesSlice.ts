import { Category } from "@/app/Types/Category";
import { createSlice } from "@reduxjs/toolkit";

interface initialType {
  categories: Category[]
  currentCategory: Category | null
  loading: boolean
  error: string | null
}


const initialState:initialType = {
  categories: [],
  currentCategory: null,
  loading: true,
  error: null,
};

const categoriesSlice =  createSlice({
    name:'categoriesSlice',
    initialState,
    reducers:{
    }
})



export default categoriesSlice.reducer;