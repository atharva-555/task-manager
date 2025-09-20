import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import taskSlice from "./slices/taskSlice.js";
import uiSlice from "./slices/uiSlice.js";


export const store = configureStore({
    reducer:{
        auth: authSlice,
        task:taskSlice,
        ui: uiSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

