import { configureStore } from "@reduxjs/toolkit";
import estudioBelaPlatformDataSlice from "./slices/estudioBelaPlatformDataSlice";

export const store = configureStore({
    reducer: {
        estudioBelaPlatformDataSlice: estudioBelaPlatformDataSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;