import TaskCard from "./TaskCard";
import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { taskService } from "../../services/taskService";
import { openModal,closeModal } from "../../store/slices/uiSlice";
import { setFilters, clearFilters } from "../../store/slices/taskSlice";
import TaskForm from './TaskForm';
import TaskFilter from "./TaskFilter";
import Spinner from "../UI/Spinner";

const TaskList=() =>{

    const dispatch = useDispatch();

    const {filteredTasks,filters,loading} = useSelector(state => state.task);
    const allTasks = useSelector(state => state.task.tasks);
    // Undeleted tasks
    const tasks =  allTasks.filter(task=>!task.isDeleted);

    useEffect(() => {
      const hasFilters = Object.values(filters).some(value => value !== '');
      if (hasFilters) {
        dispatch(taskService.filterTasks(filters));
      }
      // Note: Removed allTasks.length dependency to prevent double API calls
    }, [dispatch, filters]);

    const handleFilterChange = (newFilters) => {
      dispatch(setFilters(newFilters));
    };
    
    const handleClearFilters = () => {
      dispatch(clearFilters());
    };

    // Helper function to refresh tasks with current filters
    const refreshTasksWithFilters = () => {
      console.log("Filtering")
      const hasFilters = Object.values(filters).some(value => value !== '');
      if (hasFilters) {
        dispatch(taskService.filterTasks(filters));
      } else {
        dispatch(taskService.fetchTasks());
      }
    };

    // fetch tasks
    //  useEffect(() => {
    //     dispatch(taskService.fetchTasks());
    //   }, [dispatch]);

  const [editingTask, setEditingTask] = useState(null);
  const modals = useSelector(state => state.ui).modals;

    const handleEditTask = (task) => {
        setEditingTask(task);
        dispatch(openModal('taskForm'))
      };

    const handleDeleteTask = async (taskId) => {
        const result = await dispatch(taskService.deleteTask(taskId));
        if (result.success) {
          refreshTasksWithFilters(); // Use helper function to maintain filters
        }
    };

      const handleCloseForm = () => {
    dispatch(closeModal('taskForm'));
    setEditingTask(null);
  };
    

      const handleCreateTask = async (taskData) => {
        const result = await dispatch(taskService.createTask(taskData));
        if (result.success) {
          dispatch(closeModal('taskForm'));
          refreshTasksWithFilters(); // Use helper function to maintain filters
        }
      };
    
      const handleUpdateTask = async(taskId,taskData)=>{
        const result = await dispatch(taskService.updateTask(taskId,taskData));
        if(result.success){
          dispatch(closeModal('taskForm'));
          refreshTasksWithFilters(); // Use helper function to maintain filters
        }
      }
    
    return (
      <>
        {/* Filters */}
        <div className="mb-8">
          <TaskFilter 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>
        
        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner size="lg" text="Loading tasks..." />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task=>{
                  return(
                      <TaskCard key={task.id} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask}/>
                  )
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-500 text-lg">No tasks found</div>
                <div className="text-gray-400 text-sm mt-2">
                  {Object.values(filters).some(value => value !== '') 
                    ? 'Try adjusting your filters' 
                    : 'Create your first task to get started'
                  }
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Show Taskform modal */}
        {modals.taskForm && (
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? 
                (data) =>handleUpdateTask(editingTask.id,data) : 
                handleCreateTask
              }
              onClose={handleCloseForm}
            />
          )}
        </>
        
    )
}

export default TaskList;