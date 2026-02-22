import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./features /todoSlice";
import userSlice from './features /userSlice'


const store = configureStore({
    reducer:{
        todoStore : todoSlice,
        userDetails : userSlice,

    }, 
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})


export default store;
export type AppStore = ReturnType<typeof store.getState>