import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Shield, 
  Users, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  Plus,
  Activity,
  Bolt,LogOut,
  TrendingUp,
  AlertCircle,
  Eye,
  UserCheck
} from 'lucide-react';
import { openModal } from '../store/slices/uiSlice';
import axiosInstance from '../services/api';
import { authService } from '../services/authService';
import { taskService } from '../services/taskService';
import TaskList from '../components/Tasks/TaskList';
import { toast } from 'react-toastify';


const AdminDashboard = () => {
  const dispatch = useDispatch();

  const [profileButton, setProfileButton] = useState(false);


   const handleLogout = () =>{
     const result = dispatch(authService.logout());
   }

   
useEffect(() => {
  dispatch(taskService.fetchTasks());
}, []);

  const { user } = useSelector(state => state.auth);
  const  allTasks  = useSelector(state => state.task.tasks);
  const [activeTab, setActiveTab] = useState('overview');

// LOADING USERS TO DISPLAY ON DASHBOARD 
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (activeTab === 'users' && users.length === 0) {
      loadUsers();
    }
  }, [activeTab]);

  const loadUsers = async () => {
    // setLoadingUsers(true);
    try {
      const response = await axiosInstance.get('auth/getAllUsers');
      setUsers(response.data.data || []);
    } catch (error) {
      console.error(' Error loading users:', error);
      setUsers([]);
    } finally {
      // setLoadingUsers(false);
    }
  };

  
  // not softDeleted
  const tasks = allTasks.filter(task => !task.isDeleted);

  // console.log(users)

  // Calculate stats
  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter(task => task.status === 'completed')?.length || 0;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  

  // // Mock user management data (would come from API)
  // const mockUsers = [
  //   { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active', tasks: 5 },
  //   { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'active', tasks: 3 },
  //   { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'admin', status: 'active', tasks: 8 },
  // ];

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <CheckSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
            </div>
          </div>
        </div>

        {/* <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div> */}

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{pendingTasks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
   

     <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
     Soft Delete Feature
  </h3>
  <p className="text-gray-600 mb-4">
    Instead of permanently deleting tasks or users, our app uses <span className="font-semibold text-gray-900">Soft Delete</span>. 
    This ensures data is not lost forever and can be restored if needed.
  </p>

  <ul className="space-y-2 text-sm text-gray-700">
    <li className="flex items-start space-x-2">
      <div className="w-2 h-2 bg-red-500 rounded-full mt-1"></div>
      <span>Safely hide tasks without removing them permanently</span>
    </li>
    <li className="flex items-start space-x-2">
      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1"></div>
      <span>Admins can view and restore soft-deleted records anytime</span>
    </li>
    <li className="flex items-start space-x-2">
      <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
      <span>Prevents accidental data loss and makes the system safer</span>
    </li>
  </ul>

    </div>

      </div>
    </div>
  );

  const renderUserManagementTab = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
        <p className="text-gray-600">Manage system users and their permissions</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <Users className="h-5 w-5 text-gray-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name.length > 20 ? user.name.slice(0, 20) + "..." : user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={()=>{toast.warning("Functionality to be implemented soon")}} className="text-blue-600 hover:text-blue-900 mr-3">
                    <Eye className="h-5 w-5" />
                  </button>
                  <button onClick={()=>{toast.warning("Functionality to be implemented soon")}} className="text-green-600 hover:text-green-900">
                    <UserCheck className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTasksTab = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Task</h3>
            <p className="text-gray-600">Monitor and manage all system tasks</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => dispatch(openModal('taskForm'))}
              className="btn btn-primary btn-sm flex  items-center bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded"
            >
              <Plus className="w-4 h-4 mr-1" />
              New Task
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <TaskList/>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Dashboard Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Welcome, {user?.name || 'Admin'}
                  </p>
                </div>
              </div>
                <div className="flex space-x-4">
                <div className="flex flex-col relative items-center bg-blue-50 px-4 py-2 rounded-lg ml-auto">
                  <button  className='ml-auto' onClick={() => setProfileButton(!profileButton)}>
                    <Bolt className={`h-6 w-6 text-purple-600 transition-transform ${
                     profileButton ? "animate-spinClockwise" : "animate-spinAntiClockwise"
                    }`} />
                  </button>

                  {profileButton && (
                    <div className={`${profileButton?"slide-down":"slide-up"}absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg"}`}>
                      <div className="py-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100"
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

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Overview</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>User Management</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tasks'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <CheckSquare className="h-4 w-4" />
                <span>Tasks</span>
              </div>
            </button>


            {/* WE will implement this if we get time */}
            {/* <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </div>
            </button> */}
          </nav>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'users' && renderUserManagementTab()}
        {activeTab === 'tasks' && renderTasksTab()}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
            <p className="text-gray-600">System configuration options will be available here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;