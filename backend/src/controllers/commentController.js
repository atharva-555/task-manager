
import models from '../models/index.js';
const { Comment, Task } = models;

// TO POST A COMMENT AND REPLY
export const addComment = async(req,res)=>{
    try{
        const {taskId,text,parentId}=req.body;

        if(!text){
            return res.status(400).json({error:"Comment text is required"});
        }

        const task = await Task.findOne({where:{id:taskId,isDeleted:false}});

        // Validate if the task is present or not
        if(!task){
            return res.status(404).json({error:"Task not found"});
        }

        // Check if the user is authorized to comment on this task
        if(task.assignedTo !== req.user.id && req.user.role !== 'admin'){
            return res.status(403).json({error:"Unauthorized to comment on this task"});
        }


        // If parentId is provided, it means this is a reply to an existing comment
        if(parentId){
            const parentComment = await Comment.findOne({where:{id:parentId,taskId}});
            if(!parentComment){
                return res.status(404).json({error:"Parent comment not found"});
            }
            const reply = await Comment.create({taskId,userId:req.user.id,text,parentId});
            return res.status(201).json(reply);
            
        }

        // If its not a reply ,Create a comment with parentId as null
        const comment = await Comment.create({taskId,userId:req.user.id,text,parentId:null});
        return res.status(201).json(comment);


    }catch(err){
        res.status(500).json({error:err.message});
    }
}


export const getCommentByTask=async(req,res)=>{
    const { id:taskId } = req.body;
    try{
        const comments = await Comment.findAll({where:{taskId}});
        return res.status(200).json(comments);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}


export const deleteComment = async(req,res)=>{
    const { id:commentId } = req.body;

    try{
        const comment = await Comment.findByPk(commentId);
        if(!comment){
            return res.status(404).json({error:"Comment not found"});
        }
        if(comment.userId !== req.user.id && req.user.role !== 'admin'){
            return res.status(403).json({error:"Unauthorized to delete this comment"});
        }
        await comment.destroy();
        return res.status(200).json({message:"Comment deleted successfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
