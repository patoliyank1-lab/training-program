import { configureStore } from "@reduxjs/toolkit";
import authSlice from './Slices/authSlice'
import categoriesSlice from './Slices/categoriesSlice'
import commentsSlice from './Slices/commentsSlice'
import postsSlice from './Slices/postsSlice'
import uiSlice from './Slices/uiSlice'

const store = configureStore({
    reducer:{
        auth:authSlice,
        categories:categoriesSlice,
        comments:commentsSlice,
        posts:postsSlice,
        ui:uiSlice,
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