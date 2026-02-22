import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";

const Store = configureStore({
    reducer:{
        userStore: userSlice
    }
})

export default Store;
export type AppStore =  typeof Store;
export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch =  AppStore['dispatch'] 