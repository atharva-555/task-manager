import TaskCard from "./TaskCard";
import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { taskService } from "../../services/taskService";
import { openModal,closeModal } from "../../store/slices/uiSlice";
import { setFilters, clearFilters } from "../../store/slices/taskSlice";
import TaskForm from './TaskForm';
import TaskFilter from "./TaskFilter";

const TaskList=() =>{

    const dispatch = useDispatch();

    const {filteredTasks,filters} = useSelector(state => state.task);
    const allTasks = useSelector(state => state.task.tasks);
    // Undeleted tasks
    const tasks =  allTasks.filter(task=>!task.isDeleted);

    useEffect(() => {
      const hasFilters = Object.values(filters).some(value => value !== '');
      console.log("filters",filters);
      if (hasFilters) {
        dispatch(taskService.filterTasks(filters));
      } else {
        // dispatch(applyClientSideFilters());
      }
    }, [dispatch, filters,allTasks.length]);

    const handleFilterChange = (newFilters) => {
      dispatch(setFilters(newFilters));
    };
    
    const handleClearFilters = () => {
      dispatch(clearFilters());
    };


    // fetch tasks
     useEffect(() => {
        dispatch(taskService.fetchTasks());
      }, [dispatch]);

  const [editingTask, setEditingTask] = useState(null);
  const modals = useSelector(state => state.ui).modals;

    const handleEditTask = (task) => {
        setEditingTask(task);
        dispatch(openModal('taskForm'))
      };

    const handleDeleteTask = (taskId) => {
        dispatch(taskService.deleteTask(taskId));
    };

      const handleCloseForm = () => {
    dispatch(closeModal('taskForm'));
    setEditingTask(null);
  };
    

      const handleCreateTask = async (taskData) => {
        const result = await dispatch(taskService.createTask(taskData));
        if (result.success) {
          dispatch(closeModal('taskForm'));
          dispatch(taskService.fetchTasks());
        }
      };
    
      const handleUpdateTask = async(taskId,taskData)=>{
        const result = await dispatch(taskService.updateTask(taskId,taskData));
        if(result.success){
          dispatch(closeModal('taskForm'));
          dispatch(taskService.fetchTasks());
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         

            {filteredTasks.map(task=>{
                return(
                    <TaskCard key={task.id} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask}/>
                )
            })}
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
   
        </div>
        </>
        
    )
}

export default TaskList;