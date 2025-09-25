import { createSlice } from "@reduxjs/toolkit";

const initialState={
    tasks:[],
    filteredTasks:[],
    loading:false,
    filters:{     
        // dueDate: '',
        // dueDateBefore: '',
        // dueDateAfter: '',
        assignedTo:'',
        isDeleted:false
    },
    comments:[],
    selectedTask:null,
    error:null
}
export const taskSlice = createSlice({
    name:'tasks',
    initialState,
    reducers:{

        setLoading:(state,action)=>{
            state.loading = action.payload
        },

        setTasks:(state,action)=>{
            state.tasks = action.payload;
            state.filteredTasks = action.payload;
            state.loading = false;
            state.error = null
        },

        addTask:(state,action)=>{
            state.tasks.push(action.payload);
            state.filteredTasks.push(action.payload);
        },
        
        updateTask:(state,action)=>{
            const {taskId,taskData} = action.payload;
            const taskIndex = state.tasks.findIndex(task=>task.id === taskId);

            if(taskIndex !== -1){
                // console.log(state.tasks[taskIndex]);
                // console.log(taskData)
                state.tasks[taskIndex] = {...state.tasks[taskIndex],...taskData};
            }

            const filteredIndex = state.filteredTasks.findIndex(task => task.id === taskId);
            if (filteredIndex !== -1) {
                state.filteredTasks[filteredIndex] = { ...state.filteredTasks[filteredIndex], ...taskData };
            }

        },


        removeTask:(state,action)=>{
            const taskId = action.payload;
            state.tasks = state.tasks.filter(task => task.id !== taskId);
            state.filteredTasks = state.filteredTasks.filter(task => task.id !== taskId);
        },

        // Filter actions
        setFilters: (state, action) => {
        state.filters = action.payload;
        },
        
        clearFilters: (state) => {
        state.filters = {
            status: '',
            dueDate: '',
            dueDateBefore: '',
            dueDateAfter: '',
            assignedTo: ''
        };
        state.filteredTasks = state.tasks;
        },


        // Set filtered tasks
        setFilteredTasks: (state, action) => {
        state.filteredTasks = action.payload;
        },

        // Utility actions
        setSelectedTask: (state, action) => {
        state.selectedTask = action.payload;
        },
    
        // Comments action

        addComment:(state,action)=>{
            // const comment = action.payload;
            state.comments.push(action.payload);
        },


        // Error actions
        setError:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },

        clearError:(state)=>{
            state.error = null;
        },

    }
})

export const { setLoading, 
    setTasks, 
    addTask, 
    updateTask, 
    removeTask, 
    setFilters, 
    clearFilters, 
    setFilteredTasks, 
    setSelectedTask, 
    addComment, 
    setError, 
    clearError } = taskSlice.actions;

export default taskSlice.reducer;