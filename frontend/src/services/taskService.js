import { useDispatch } from "react-redux";
import axiosInstance from "./api.js";
import { toast } from "react-toastify";
import {setLoading,setTasks ,setError,addComment,setFilteredTasks} from "../store/slices/taskSlice.js"


export const taskService ={

    
    fetchTasks:()=>async(dispatch)=>{
        dispatch(setLoading(true));

        try{
            const response = await axiosInstance('/task/getAllTasks');
            dispatch(setTasks(response.data));
            // console.log('Fetched tasks:', response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to fetch tasks';
            dispatch(setError(errorMessage));
            toast.error(errorMessage);
            console.error('Error fetching tasks:', error);
        }
        },
    
    createTask:(taskData)=>async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response = await axiosInstance.post('/task/createTask', taskData);
            console.log('Task created successfully:', response.data);
            dispatch(setLoading(false));
            toast.success('Task created successfully!');
            return { success: true, data: response.data };
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to create task';
            dispatch(setError(errorMessage));
            toast.error(errorMessage);
            console.error('Error creating task:', error);
            return { success: false, error: errorMessage };
        }
    },

    updateTask:(taskId,taskData)=>async (dispatch)=>{
        dispatch(setLoading(true));
        try{
            console.log("TASKID:",taskId)
            console.log("TaskData : ",taskData);
            const response = await axiosInstance.put('/task/updateTask/'+taskId,taskData);
            console.log('Task updated successfully:', response.data);
            toast.success('Task updated successfully!');
            return { success: true, data: response.data };
        }
        catch(error){
            const errorMessage = error.response?.data?.error || 'Failed to update task';
            dispatch(setError(errorMessage));
            toast.error(errorMessage);
            console.error('Error updating task:', error);
            return { success: false, error: errorMessage };
        }
    },

    deleteTask:(taskId)=>async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response = await axiosInstance.delete('/task/deleteTask/'+taskId);
            console.log('Task deleted successfully:', response.data);
            dispatch(taskService.fetchTasks());
            toast.success('Task deleted successfully!');
            return { success: true, data: response.data };
        }
        catch(error){
            const errorMessage = error.response?.data?.error || 'Failed to delete task';
            dispatch(setError(errorMessage));
            toast.error(errorMessage);
            console.error('Error deleting task:', error);
            return { success: false, error: errorMessage };
        }
    },

      // Add comment
      addComment: (commentData) => async (dispatch) => {
        try {
          const response = await axiosInstance.post('/comment/addComment',commentData);
          dispatch(addComment(response.data));
          toast.success('Comment added successfully!');
          console.log('Comment added:', response.data);
          return { success: true, data: response.data };
        } catch (error) {
          const errorMessage = error.response?.data?.error || 'Failed to add comment';
          toast.error(errorMessage);
          console.error('Error adding comment:', error);
          return { success: false, error: errorMessage };
        }
      },

      getCommentByTask:(taskId)=>async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response = await axiosInstance.get('/comment/getCommentByTask?taskId='+taskId);
            console.log('Comments fetched successfully:', response.data);
            dispatch(setLoading(false));
            return { success: true, data: response.data };
        }
        catch(error){
            const errorMessage = error.response?.data?.error || 'Failed to fetch comments';
            dispatch(setError(errorMessage));
            toast.error(errorMessage);
            console.error('Error fetching comments:', error);
            return { success: false, error: errorMessage };
        }
      }
      ,
      filterTasks:(filters)=>async(dispatch)=>{
        
          dispatch(setLoading(true));
          try{
            // console.log('Filters:', filters);
            //   const response = await axiosInstance.post('/task/getTasksByFilter',filters);
            //   console.log('Filtered tasks fetched successfully:', response.data);
            //   dispatch(setFilteredTasks(response.data));
            //   dispatch(setLoading(false));
            //   return { success: true, data: response.data };
                // Clean filters - only include keys with meaningful values
                 // Build clean filters with guaranteed isDeleted boolean
    const cleanFilters = {
      isDeleted: filters.isDeleted === true ? true : false, // Always include as boolean
    };
    
    // Add other filters only if they have values
    Object.entries(filters).forEach(([key, value]) => {
      if (key !== 'isDeleted' && value && value !== '' && value !== null && value !== undefined) {
        cleanFilters[key] = value;
      }
    });

                // console.log('Original filters:', filters);
                console.log('Cleaned filters:', cleanFilters);
                
                // If no meaningful filters, fetch all tasks instead of calling filter API
                if (Object.keys(cleanFilters).length === 0) {
                console.log('📋 No filters applied, fetching all tasks');
                const response = await axiosInstance('/task/getAllTasks');
                dispatch(setTasks(response.data));
                } else {
                console.log('🔍 Applying filters:', cleanFilters);
              const response = await axiosInstance.post('/task/getTasksByFilter',cleanFilters);                dispatch(setTasks(response.data));
                }
                
                dispatch(setLoading(false));
          }
          catch(error){
              const errorMessage = error.response?.data?.error || 'Failed to fetch filtered tasks';
              dispatch(setError(errorMessage));
              toast.error(errorMessage);
              console.error('Error fetching filtered tasks:', error);
              return { success: false, error: errorMessage };
          }
      }
        
}

