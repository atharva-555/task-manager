// import authSlice from "../store/slices/authSlice";
import { toast } from "react-toastify";
import axiosInstance from "./api.js";
import { setLoading, loginSuccess, loginError, logoutSuccess, registerSuccess, authError, clearError, resetAuth,checkAuthSuccess } from "../store/slices/authSlice.js";
import { Navigate } from "react-router-dom";
import { resetTasks } from '../store/slices/taskSlice.js';

export const authService = {
    login:(credentials)=>async (dispatch)=>{
        // console.log("Login API");
        dispatch(setLoading(true));
        try{
            const response = await axiosInstance.post('/auth/login', credentials);
            if(response.status === 200){
            // console.log("response data from Login API :", response.data);
            toast.success(response.data);

            // Gather user data from the API response
            const user = {
                id: response.data.user?.id || "id",
                name: response.data.user?.name || "Name",
                email: credentials.email,
                role: response.data.user?.role || 'user', // Default to 'user' if no role provided
                authenticated: true,
               };

            // Validate role
            if (!['user', 'admin'].includes(user.role)) {
                throw new Error('Invalid user role received from server');
            }
            
            dispatch(loginSuccess(user));
            toast.success(`Login successful! Welcome ${user.name}`);
            return { success: true, user };
            }
        }catch (error) {
            const errorMessage = error.response?.data?.error || error.message || 'Login failed';
            dispatch(authError(errorMessage));
            toast.error(errorMessage);
            return { success: false, error: errorMessage };
    }
    },

    register:(credentials,navigate)=>async(dispatch)=>{
        // console.log("Register API");
        dispatch(setLoading(true));
        try{
            const response = await axiosInstance.post('/auth/register', credentials);
            if(response.status === 201){
                dispatch(registerSuccess());
                toast.success('Registration successful! Please login.');
                navigate('/login');
            }
        }catch(error){
            const errorMessage = error.response?.data?.error || 'Registration failed';
            dispatch(authError(errorMessage));
            toast.error(errorMessage);
        }

    },

    logout:()=>async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response = await axiosInstance.post('/auth/logout');
            if(response.status === 200){
                dispatch(resetTasks());
                dispatch(logoutSuccess());
                toast.success('Logged out successfully!');
            }
        }catch(error){
            const errorMessage = error.response?.data?.error || 'Logout failed';
            dispatch(authError(errorMessage));
            toast.error(errorMessage);
        }

    },

    

    checkAuth:()=>async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            // console.log("API HITTING get current user");
            const response = await axiosInstance('/auth/getcurrentuser');
            if(response.status === 200){

                // Extract user data from backend response format
                const userData = response.data;
                // console.log("userdata:",userData)
                const user = {
                    id: userData.data.id || 1,
                    name:userData.data.name || "Name",
                    email: userData.data.email,
                    role: userData.data.role || 'user',
                    authenticated: true, 
                };
                // console.log("user:",userData)
                // console.log("userDATA.id:",userData.data.id)
                // console.log("user.id:",user.data.id)


                dispatch(checkAuthSuccess(user));
                return { success: true, user };
            }
        }catch(error){
            const errorMessage = error.response?.data?.error || error.message || 'Failed to get user info';
            dispatch(authError(errorMessage));
            // toast.error(errorMessage);
        }
    }

}