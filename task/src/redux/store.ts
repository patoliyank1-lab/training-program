import { configureStore } from "@reduxjs/toolkit";
import authSlice from './Slices/authSlice'
import categoriesSlice from './Slices/categoriesSlice'
import jobSlice from './Slices/jobSlice'

const store = configureStore({
    reducer:{
        auth:authSlice,
        categories:categoriesSlice,
        jobs:jobSlice,
    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store;
export type StoreType = typeof store;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = StoreType['dispatch']