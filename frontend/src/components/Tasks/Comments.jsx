import React, { useState } from 'react';
import { MessageCircle, Reply, Send, X, User, Clock } from 'lucide-react';
import Spinner  from '../UI/Spinner';

const Comments = ({ taskId, comments, onAddComment,onRefresh }) => {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      return;
    }

    setLoading(true);
    
    try {
      const response = await onAddComment({
        text: newComment.trim(),
        parentId: replyTo
      });
       
      // Automatically refresh comments after successful addition
      await onRefresh();
  
      
      setLoading(false)
      setNewComment('');
      setReplyTo(null);
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = (commentId) => {
    setReplyTo(commentId);
  };

  const handleCancelReply = () => {
    setReplyTo(null);
    setNewComment('');
  };

  

  const renderComment = (comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-8 border-l-2 border-gray-200 pl-4' : ''} mb-4`}>
      <div className={`bg-gray-50 rounded-lg p-4 ${isReply ? 'bg-gray-25' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-6 h-6 bg-primary-100 rounded-full">
              <User className="w-3 h-3 text-primary-600" />
            </div>
            <span className="text-sm font-medium text-gray-900 text-md">{comment.User?.name}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>
              {new Date(comment.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
        
        <div className="text-gray-700 mb-3 text-sm">
          {comment.text}
        </div>
        
        <button 
          className="flex items-center space-x-1 text-xs text-primary-600 hover:text-primary-800 transition-colors"
          onClick={() => handleReply(comment.id)}
        >
          <Reply className="w-3 h-3" />
          <span>Reply</span>
        </button>
      </div>
      
      {/* Render replies if any */}
      {comment.replies && comment.replies.map(reply => 
        renderComment(reply, true)
      )}
    </div>
  );

  return (
    <div className="p-4 bg-gray-50">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4">
        <MessageCircle className="w-5 h-5 text-gray-600" />
        <h4 className="text-lg font-semibold text-gray-900">
          Comments ({comments.length})
        </h4>
      </div>

      {/* Comments List */}
      <div className="mb-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-3"></div>
            <p className="text-gray-500">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map(comment => renderComment(comment))}
          </div>
        )}
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="space-y-3">
        {replyTo && (
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Reply className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800">Replying to comment #{replyTo}</span>
            </div>
            <button 
              type="button" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
              onClick={handleCancelReply}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        <div className="space-y-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={replyTo ? "Write your reply..." : "Add a comment..."}
            disabled={submitting}
            rows={3}
            className="form-input resize-none w-full outline-none border border-gray-200 rounded-lg p-3"
          />
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="btn btn-primary btn-sm"
              disabled={submitting || !newComment.trim()}
            >
              {submitting ? (
                <div>
                  <Spinner className="mr-2" />
                  Posting...
                </div>
              ) : (
                < div className="flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  {replyTo ? 'Reply' : 'Comment'}
                </div >
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Comments;