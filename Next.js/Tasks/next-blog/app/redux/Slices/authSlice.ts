import { StoreUser } from "@/app/Types/User";
import { IsAdmin } from "@/app/utils/authFunctions";
import { createSlice } from "@reduxjs/toolkit";

interface initialType {
  user: StoreUser| null
  isAuthenticated: boolean
  isAdmin: boolean
  loading: boolean
  error: string | null
}


const initialState:initialType = {
    user:null,
    isAuthenticated:false,
    isAdmin:false,
    loading:false,
    error:null,
};

const authSlice =  createSlice({
    name:'authSlice',
    initialState,
    reducers:{
      setUser(state, action){
        const newUser:StoreUser = action.payload;
        state.user = { ...newUser};
        state.isAuthenticated = true;
        state.isAdmin = IsAdmin({...newUser});
      },

      removeUser(state){
        state.user = null;
        state.isAdmin = false;
        state.isAuthenticated = false;
      },
    }
})



export default authSlice.reducer;
export const { setUser } = authSlice.actions; 
export const { removeUser } = authSlice.actions; 

