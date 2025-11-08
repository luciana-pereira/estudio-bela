import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface EstudioBelaPlatformDataState {
    selectedEvent: string;
    userType: string;
}

const initialState: EstudioBelaPlatformDataState = {
    selectedEvent: '',
    userType: '',
};

export const estudioBelaPlatformDataSlice = createSlice({
    name: "estudioBelaPlatformData",
    initialState,
    reducers: {
        setSelectedEvent: (state, action: PayloadAction<string>) => {
            state.selectedEvent = action.payload;
        },
        setUserType: (state, action: PayloadAction<string>) => {
            state.userType = action.payload;
        },
    },
});

export const {
    setSelectedEvent,
    setUserType,
} = estudioBelaPlatformDataSlice.actions;

export default estudioBelaPlatformDataSlice.reducer;