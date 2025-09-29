import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { taskService } from '../services/taskService';
import { User, CheckSquare,Plus, Calendar, BarChart3,Bolt,LogOut } from 'lucide-react';
import {openModal,closeModal} from '../store/slices/uiSlice';
import TaskList from '../components/Tasks/TaskList';
import Spinner from '../components/UI/Spinner';

const UserDashboard = () => {

  const dispatch = useDispatch();
  const [loadingStats, setLoadingStats] = useState(false);
  
  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        await dispatch(taskService.fetchTasks());
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, [dispatch]);

  
  const user  = useSelector(state => state.auth.user);
  const tasks  = useSelector(state => state.task.tasks);




  const [profileButton, setProfileButton] = useState(false);

  console.log("task at frontend",tasks);
  // const tasks=[]

  // Calculate user statistics
  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter(task => task.status === 'completed')?.length || 0;
  const pendingTasks = totalTasks - completedTasks;


  // const completionRate = 100
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;





  const handleLogout = () =>{
    const result = dispatch(authService.logout());
  }



  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Dashboard Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
              <div>
                  <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                    Welcome back, {user?.name || 'User'}!
                  </h1>
                  <p className="text-sm md:text-lg text-gray-600">Manage your tasks and track your progress</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex flex-col relative items-center bg-blue-50 px-4 py-2 rounded-lg ml-auto">
                  <button  className='ml-auto' onClick={() => setProfileButton(!profileButton)}>
                    <Bolt className={`h-6 w-6 text-blue-600 transition-transform ${
                     profileButton ? "animate-spinClockwise" : "animate-spinAntiClockwise"
                    }`} />
                  </button>

                  {profileButton && (
                    <div className={`${profileButton?"slide-down":"slide-up"}absolute right-0 mt-2 bg-white rounded-lg shadow-lg"}`}>
                      <div className="p-0 md:p-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2  px-2 md:px-4 py-2 text-gray-600 hover:bg-gray-100 "
                        >
                          <LogOut className="h-5 w-5 text-red-500" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              
            </div>
                
          </div>
        </div>
      </div>

      {/* User Statistics */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Tasks */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <CheckSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                {loadingStats ? (
                  <div className="flex items-center">
                    <Spinner size="sm" />
                    <span className="ml-2 text-gray-400">Loading...</span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
                )}
              </div>
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckSquare className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                {loadingStats ? (
                  <div className="flex items-center">
                    <Spinner size="sm" />
                    <span className="ml-2 text-gray-400">Loading...</span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                {loadingStats ? (
                  <div className="flex items-center">
                    <Spinner size="sm" />
                    <span className="ml-2 text-gray-400">Loading...</span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{pendingTasks}</p>
                )}
              </div>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                {loadingStats ? (
                  <div className="flex items-center">
                    <Spinner size="sm" />
                    <span className="ml-2 text-gray-400">Loading...</span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-gray-900 text-sm md:text-lg">{user?.email || 'Not available'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Role</label>
                <p className="text-gray-900 capitalize text-sm md:text-lg">{user?.role || 'User'}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button onClick={()=>{dispatch(openModal('taskForm'))}} className="w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Plus className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-700 font-medium">Create New Task</span>
                </div>
              </button>
              
            </div>
          </div>
        </div>

        {/* Task Management Section */}
        <div className="bg-white rounded-lg shadow">
          <div className='flex items-center justify-between'>
            <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">My Tasks</h2>
            <p className="text-gray-600 text-md">Manage and track your personal tasks</p>
            </div>
          </div>

          
          <div className="p-2 md:p-6">
            <TaskList />
          </div>
        </div>
      </div>
      </div>

   


  );
};

export default UserDashboard;