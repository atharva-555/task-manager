import { Filter, X } from 'lucide-react';
import {useState,useEffect} from 'react';
import axiosInstance from '../../services/api';
import { useSelector } from 'react-redux';

const TaskFilter = ({ filters, onFilterChange, onClearFilters }) => {

// Load user data for getting its role
    const {user} = useSelector(state=>state.auth);


    // LOADING USERS TO DISPLAY ON Filter OPTIONS
      const [users, setUsers] = useState([]);
      useEffect(() => {
        if ( users.length === 0) {
          loadUsers();
        }
      }, []);

      const loadUsers = async () => {
        // setLoadingUsers(true);
        try {
            if(user.role!=='admin'){return}
          const response = await axiosInstance.get('auth/getAllUsers');
          setUsers(response.data.data || []);
        } catch (error) {
          console.error(' Error loading users:', error);
          setUsers([]);
        } finally {
        //   setLoadingUsers(false);
        }
      };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

//   console.log(filters);
  const handleFilterChange = (name, value) => {
    const newFilters = {
      ...filters,
      [name]: value
    };
    onFilterChange(newFilters);
  };

  return (
    <div className='flex flex-col flex-wrap'>
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 p-4 bg-gray-50 rounded-lg">
        {/* Status Filter */}
        <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
            <select
            value={filters.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="form-input w-32"
            >
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            </select>
        </div>

        {user?.role==='admin'&&(<>
            <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Assignee</label>
            <select
                value={filters.assignedTo || ''}
                onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
                className="form-input w-48"
            >
                <option value="">All</option>
                {users.map((user) => (
                <option key={user.id} value={user.id}>
                    {user.email}
                </option>
                ))}
            </select>
            </div>

            <div>
                <label
                    htmlFor="soft-deleted-filter"
                    className="text-sm font-medium text-gray-700 mb-1 block"
                >
                    Soft Deleted
                </label>
                <input
                    type="checkbox"
                    id="soft-deleted-filter"
                    checked={filters.isDeleted || false}
                    onChange={(e) => handleFilterChange('isDeleted', e.target.checked)}
                    className="form-checkbox"
                />
            </div>
            </>
           )
           
           } 
 
            
        </div>
        {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-gray-700">Active filters:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                {filters.status && filters.status !== '' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    Status: {filters.status}
                    <button 
                        onClick={() => handleFilterChange('status', '')}
                        className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                        <X className="w-3 h-3" />
                    </button>
                    </span>
                )}
                {filters.dueDate && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                    Due: {filters.dueDate}
                    <button 
                        onClick={() => handleFilterChange('dueDate', '')}
                        className="ml-2 text-secondary-600 hover:text-secondary-800"
                    >
                        <X className="w-3 h-3" />
                    </button>
                    </span>
                )}


                {filters.assignedTo && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Assignee: {users.find(u => u.id === parseInt(filters.assignedTo))?.email || filters.assignedTo}
                    <button 
                    onClick={() => handleFilterChange('assignedTo', '')}
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                    >
                    <X className="w-3 h-3" />
                    </button>
                </span>
                )}

            </div>
        </div>
        )}
    </div>
  );
};

export default TaskFilter;
