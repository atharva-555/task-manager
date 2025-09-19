import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    user:null,
    isAuthenticated:false,
    loading:false,
    error:null,
    isInitialized:false
}
export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

        setLoading:(state,action)=>{
            state.loading = action.payload
        },

        loginSuccess:(state,action)=>{
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null
        },

        loginError:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
        },

        logoutSuccess:(state)=>{
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },

        registerSuccess:(state)=>{
            state.loading = false;
            state.error = null;
        },

        authError:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
            state.isInitialized = true;
        },

        clearError:(state)=>{
            state.error = null;
        },

        checkAuthSuccess:(state,action)=>{
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
            state.isInitialized = true;
        },

        resetAuth:(state)=>{
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            state.loading = false;
        }


    },
})

export const { setLoading, loginSuccess, loginError, logoutSuccess, registerSuccess, authError, clearError, resetAuth,checkAuthSuccess } = authSlice.actions
export default authSlice.reducer;