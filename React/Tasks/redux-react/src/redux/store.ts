import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/countSlice";

const store = configureStore({
    reducer:{
        counter:counterSlice,
    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch']; 