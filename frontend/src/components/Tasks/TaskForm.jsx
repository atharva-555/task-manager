import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { X, Save, Plus, Calendar, User, FileText, Flag, Loader2 } from 'lucide-react';
import Spinner from '../UI/Spinner';
import axiosInstance from '../../services/api';
// import { ButtonSpinner } from '../UI/Spinner';

const TaskForm = ({ task, onSubmit, onClose }) => {

  // Get current user role from the store 
  const { user: currentUser } = useSelector(state => state.auth);
  const userRole = currentUser?.role;

  // Add state for users list
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (userRole === 'admin') {
        setLoadingUsers(true);
        try {
          const response = await axiosInstance.get('/auth/getAllUsers');
          setUsers(response.data.data || []);
        } catch (error) {
          console.error('Error fetching users:', error);
          setUsers([]);
        }
         finally {
          setLoadingUsers(false);
        }
      }
    };

  fetchUsers();
}, [userRole]);

  const { loading } = useSelector(state => state.task);
  const {user} = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    dueDate: '',
    recurrence: 'none',
    assignedTo: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(task){
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'open',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        recurrence: task.recurrence || 'none',
        assignedTo: task.assignedTo || '',
      })
    }
  },[task])
  
    const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData.title.length > 255) {
      newErrors.title = 'Title must not exceed 255 characters';
    }
    
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }
    
    if(!formData.dueDate){
      newErrors.dueDate = 'Due date is required';
    }

    if (formData.dueDate) {
      const dueDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dueDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormData(prev=>({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-strong max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg">
              {task ? <Save className="w-5 h-5 text-primary-600" /> : <Plus className="w-5 h-5 text-primary-600" />}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {task ? 'Edit Task' : 'Create New Task'}
              </h2>
              <p className="text-sm text-gray-600">
                {task ? 'Update task details' : 'Add a new task to your list'}
              </p>
            </div>
          </div>
          <button 
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={onClose}
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="form-label flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Task Title *</span>
            </label>
            <input
              type="text"
              id="title"
              name="title" 
              onChange={handleChange}
              value={formData.title}
              className='p-2 form-input border rounded-md w-full'
              placeholder="Enter a descriptive task title"
              disabled={loading}
              maxLength={255}
            />
            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
           
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description" onChange={handleChange}
              value={formData.description}

              placeholder="Provide additional details about the task (optional)"
              disabled={loading}
              rows={4}
              className="p-2 form-input border rounded-md w-full"
            />
            {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
          </div>

          {/* Status and Recurrence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="form-label flex items-center space-x-2">
                <Flag className="w-4 h-4" />
                <span>Status *</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={`form-input`}
                disabled={loading}
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              {errors.status && <div className="text-red-500 text-sm mt-1">{errors.status}</div>}
             
            </div>

            <div>
              <label htmlFor="recurrence" className="form-label">
                Recurrence
              </label>
              <select
                id="recurrence"
                name="recurrence"
                value={formData.recurrence}
                onChange={handleChange}
                className="form-input"
                disabled={loading}
              >
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          {/* Due Date and Assignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dueDate" className="form-label flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Due Date</span>
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className='form-input'
                disabled={loading}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.dueDate && <div className="text-red-500 text-sm mt-1">{errors.dueDate}</div>}
              
            </div>

{user.role === 'admin' &&(
   <select
      id="assignedTo"
      name="assignedTo"
      value={formData.assignedTo}
      onChange={handleChange}
      className={`form-input ${errors.assignedTo ? 'form-input-error' : ''}`}
      disabled={loading || loadingUsers}
    >
      <option value="">Select a user (optional)</option>
      <option value={currentUser?.id}>Assign to myself</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.email} 
        </option>
      ))}
    </select>
)}
</div>
     

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <button 
              type="button" 
              className="btn btn-outline rounded-md p-2 text-red-600"
              onClick={onClose}
              disabled={isSubmitting || loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={`btn btn-primary flex items-center p-2 rounded-md text-white ${
                isSubmitting 
                  ? 'bg-primary-400 cursor-not-allowed' 
                  : 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 active:bg-primary-800'
              }`}
              disabled={isSubmitting || loading}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {task ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  {task ? <Save className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-1" />}
                  {task ? 'Update Task' : 'Create Task'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;