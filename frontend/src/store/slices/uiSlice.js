import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    sidebarOpen: false,
    loading: false,
    error: null,
    modals:{
        taskForm: false,
        taskDetails: false,
        confirmDelete: false,
    },
};

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
        },
        openModal: (state, action) => {
            state.modals[action.payload] = true;
        },
        closeModal: (state, action) => {
            state.modals[action.payload] = false;
        },
        closeAllModals: (state) => {
            state.modals = {
                taskForm: false,
                taskDetails: false,
                confirmDelete: false,
            };
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { toggleSidebar, setSidebarOpen, openModal, closeModal, closeAllModals, setLoading, setError } = uiSlice.actions;

export default uiSlice.reducer;