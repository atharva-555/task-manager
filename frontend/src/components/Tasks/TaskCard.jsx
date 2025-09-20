import {Circle,Clock,CheckCircle,Edit3,Trash2,User,Calendar,MessageCircle} from 'lucide-react'
import { useState } from 'react';
import { taskService } from '../../services/taskService';
import { useDispatch,useSelector } from 'react-redux';
import Comments from './Comments';
const TaskCard = ({task,onEdit,onDelete}) => {

    const dispatch = useDispatch();
    // const taskData={
    //     title:'Title',
    //     description:'Description',
    //     dueDate:'2023-01-01',
    //     assignedTo:'Assignee',
    //     status:'open',
    //     recurrence:'none',
    //     createdBy:'Admin'
    // }

    const user  = useSelector(state => state.auth.user);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [loadingComments, setLoadingComments] = useState(false);

    const handleAddComment = async (commentData) => {
        try {
          
            const result = await dispatch(taskService.addComment({
                ...commentData,
                taskId: task.id
            }));

            if (result.success) {
                setComments(prev => [...prev, result.data]);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
        
    };

   
    const loadComments = async () => {
        if (loadingComments) return;
        
        setLoadingComments(true);
        try {
            console.log('Loading comments for task:', task.id);
            const response = await dispatch(taskService.getCommentByTask(task.id));
            console.log('Raw comments response:', response.data);
            setComments(response.data);
            // Organize comments with replies
           const organizedComments = organizeComments(response.data);
           console.log('Organized comments:', organizedComments);
           setComments(organizedComments);
        } catch (error) {
            console.error('Error loading comments:', error);
            setComments([]);
        } finally {
            setLoadingComments(false);
        }
    };

    const organizeComments =(commentsData) =>{
      const commentMap = {};
      const rootComments = [];

      // First pass: create comment objects
      commentsData.forEach(comment => {
          commentMap[comment.id] = { ...comment, replies: [] };
          // console.log(commentMap[comment.id])
      });

      // Second pass: organize into tree structure
      commentsData.forEach(comment => {
          if (comment.parentId && comment.parentId !== null) {
              // This is a reply
              if (commentMap[comment.parentId]) {
                  commentMap[comment.parentId].replies.push(commentMap[comment.id]);
              } 
          } else {
              // This is a root comment
              rootComments.push(commentMap[comment.id]);
          }
      });
      
      console.log("COMMENT MAP:",commentMap);
      console.log("ROOTCOMMENTS:",rootComments);
      return rootComments;
    }

    const toggleComments = () => {
        if (!showComments && comments.length === 0) {
            loadComments();
        }
        setShowComments(!showComments);
    };


    const formatDate = (datestring)=>{
      if(!datestring){ 
        return 'No due date';
      }

      const date = new Date(datestring);
      return date.toLocaleDateString('en-US', {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric'
      })
      // console.log(date.toLocaleDateString('hi-IN', {
      //   year: 'numeric',
      //   month: 'long',
      //   day: 'numeric'
      // }));
    }

    const getStatusIcon = (status) =>{
      switch(status){
        case 'open': return <Circle className="w-3 h-3" />;
        case 'in-progress': return <Clock className="w-3 h-3" />;
        case 'completed': return <CheckCircle className="w-3 h-3" />;
        default: return <Circle className="w-3 h-3" />;
      }
    }

    const getStatusClass = (status)=>{
        switch(status){
          case 'open': return 'status-open';
          case 'in-progress': return 'status-in-progress';
          case 'completed': return 'status-completed';
          default: return 'badge-gray';
        }
    }

    // 

  return (
    <div className='card rounded-xl shadow-md border-[1px] border-gray-100 '>
        <div className='card-body p-2 md:p-4'>
          {/* Status ,Recurrence and Actions*/}
          <div className='flex'>
            <div className='flex flex-col space-y-2 '>
              <div className={`${getStatusClass(task.status)} flex space-x-2 items-center text-sm p-1 md:p-2 rounded-full`}>
                <span >{getStatusIcon(task.status)}</span>
                <span className='capitalize text-md'>{task.status}</span>
              </div>
              <div className='flex items-center text-gray-600 text-sm space-x-1 ml-1'>
                <Calendar className="w-3 h-3" />
                <span className='capitalize '>{task.recurrence}</span>
              </div>
            </div>
            <div className='flex flex-row space-x-2 ml-auto items-start'>
              <button onClick={() => onEdit(task)} className='btn btn-primary text-gray-600 p-2'><Edit3 className=' w-5 h-5' /></button>

              {user?.role === 'admin' &&( <button onClick={() => onDelete(task.id)} className='btn btn-primary text-red-500 p-2'><Trash2 className='w-5 h-5' /></button>)}
   
            </div>
          </div>

          {/* Title and Description */}
          <div className='text-md my-2 md:my-4 '>
            <h3 className='text-md font-semibold'>{task.title.length>40?task.title.slice(0,40)+'...':task.title}</h3>
            <p className='text-gray-600 break-words'>{task.description.length>300?task.description.slice(0,300)+'...':task.description}</p>
          </div>

          {/* Due Date, Assignee and Created By */}
          <div className='flex items-center  justify-between space-x-2'>
            <div className='flex flex-col space-y-1'>
              <div className='flex items-center space-x-1 text-sm text-gray-500  mb-4'>
                <Clock className="w-4 h-4" />
                <span className='capitalize'>Created At : {formatDate(task.createdAt)}</span>
              </div>
              <div className='flex items-center space-x-1 text-sm text-gray-500 break-word'>
                
                {task.creator && (
                  <div className="flex items-center space-x-1">
                    <span className='break-words max-w-[170px]'><p className='font-semibold flex'><User className="w-4 h-4" />Created By:</p> {task.creator.email}</span>
                  </div>
                )}
              </div>
            </div>

            <div className='flex flex-col justify-startspace-y-1 items-end'>  
              <div className='flex items-center   mr-auto  space-x-1 text-sm text-gray-500 mb-4'>
                <Clock className="w-4 h-4" />
                <span className='capitalize'>Due date : {formatDate(task.dueDate)}</span>
              </div>  
              <div className='flex items-center space-x-1 text-sm text-gray-500 '>
                
                {task.assignee && (
                  <div className="flex items-center space-x-1 " >
                    <span className='break-words  max-w-[170px]'><p className='font-semibold flex'><User className="w-4 h-4" />Assigned To:</p> {task.assignee.email}</span>
                  </div>
                )}
              </div>     
            </div>
          </div>
            
        </div>

        {/* COmments */}
          <div className='bg-gray-100 p-2 md:p-4 '>
            <span className="text-xs text-gray-400 font-mono ml-auto">TASK ID: {task.id}</span>
            <div className='flex items-center space-x-1 text-sm text-gray-800'>
              <button onClick={()=>toggleComments() } className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className='capitalize'>{showComments ? 'Hide' : 'Show'} Comments</span>
              </button>
            </div>

          </div>
          {/* Comments Section */}
            {showComments && (
                <div className="border-t border-gray-200">
                    <Comments
                        taskId={task.id}
                        comments={comments}
                        onAddComment={handleAddComment}
                        onRefresh={loadComments}
                    />
                </div>
            )}
    </div>
  )
}

export default TaskCard