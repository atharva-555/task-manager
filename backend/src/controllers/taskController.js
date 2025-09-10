import models from "../models/index.js";
import {ROLES} from "../constants/roles.js";
const { Task, User } = models;

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { role,  id:userId } = req.user;
    let { title, description, status, dueDate } = req.body;
    let assignedTo;
    if(role === ROLES.ADMIN){
      assignedTo = req.body.assignedTo;
    }
    else {
      assignedTo = req.user.id;
    }

    const createdBy = req.user.id; 

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Validate assignee if provided
    if (assignedTo) {
      const user = await User.findByPk(assignedTo);
      if (!user) {
        return res.status(400).json({ error: "Assignee not found" });
      }
    }

    const newTask = await Task.create({
      title,
      description,
      assignedTo,
      status,
      dueDate,
      createdBy,
    });

    return res.status(201).json({
      message: "Task created successfully",
      taskId: newTask.id,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get All tasks
export const getAllTasks = async (req, res) => {
    // console.log("role =",req.user.role);
  try {
    const { role,  id:userId } = req.user;
    // console.log(req.user);
    let tasks;
    if (role === ROLES.ADMIN) {
      tasks = await Task.findAll();
    } else {
      tasks = await Task.findAll({ where: { assignedTo: userId ,isDeleted:false} });
    }
    // console.log(role)
    return res.json(tasks);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getTaskById = async (req, res) => {
    // console.log("role =",req.user.role);
  try {
    const { role,  id:userId } = req.user;
    const taskId = req.params.id;
    // console.log(req.user);
    let task;
    if (role === ROLES.ADMIN) {
      task = await Task.findOne({ where: { id:taskId }});
    } else {
      task = await Task.findOne({ where: { assignedTo: userId , id:taskId,isDeleted:false} });
    }

     if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    // console.log(role)
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, assignedTo } = req.body;
    const task = await Task.findOne({ where: { id: req.params.id, isDeleted: false } });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (task.assignedTo !==req.user.id && req.user.role !== 'admin') {
      console.log(req.user.role,task.assignedTo,req.user.id);
      return res.status(403).json({ error: 'Unauthorized' });
    }
    if (assignedTo) {
      const user = await User.findByPk(assignedTo);
      if (!user) return res.status(400).json({ error: 'Assignee not found' });
    }
    await task.update({ title, description, status, dueDate, assignedTo });
    res.json(task,{message:"Task updated successfully"});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// export const assignTask = async (req, res) => {
//   try {
//     const { assignedTo } = req.body;
//     const task = await Task.findOne({ where: { id: req.params.id, isDeleted: false } });
//     if (!task) return res.status(404).json({ error: 'Task not found' });
//     if (assignedTo) {
//       const user = await User.findByPk(assignedTo);
//       if (!user) return res.status(400).json({ error: 'Assignee not found' });
//     }
//     await task.update({ assignedTo });
//     res.json(task);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

export const deleteTask = async (req, res) => {
    // console.log("role =",req.user.role);
  try {
    const task = await Task.findOne({where:{id:req.params.id}})
    if (!task) return res.status(404).json({ error: 'Task not found' });
    await task.update({isDeleted:true});
    return res.status(200).json({message:"Task deleted successfully"});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


