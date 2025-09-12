import models from "../models/index.js";
import {ROLES} from "../constants/roles.js";
import {TASKSTATUS, TASKSTATUS_VALUES} from "../constants/taskStatus.js";
import {RECURRENCE, RECURRENCE_VALUES} from "../constants/recurrence.js";

const { Task, User } = models;
import { Op } from "sequelize";
import validate from '../utils/inputValidations.js';
// Create a new task
export const createTask = async (req, res) => {
  try {
    const { role,  id:userId } = req.user;
    const { title, description, status, dueDate,recurrence } = req.body;
    // if(status){
    //   console.log("GOT STATUS IN BODY");
    // }
    // console.log(req.body);

    // VALIDATIONS
    if(title){
      const titleValidation = validate.title(title, 'title', true);
      if (titleValidation) {
        return res.status(400).json({ error: titleValidation.message });
      }
    }

    if(dueDate){
      const dueDateValidation = validate.dueDate(dueDate, 'dueDate');
      if (dueDateValidation) {
        return res.status(400).json({ error: dueDateValidation.message });
      }
    }

    // console.log("typeof status :",typeof status);
    // console.log("length :",status.length);
    // console.log( status == null);

   if(status.length == 0){
        return res.status(400).json({ error: "Status cannot be empty" });
      } 
 
    if(status){
      //  console.log("length :",status.length);
      // console.log("GOT STATUS IN if condition");
        const statusValidation = validate.enum(status, 'status',TASKSTATUS_VALUES);
        if (statusValidation) {
          return res.status(400).json({ error: statusValidation.message });
          
        }
      }

    if(recurrence){
      const recurrenceValidation = validate.enum(recurrence, 'recurrence', RECURRENCE_VALUES);
      if (recurrenceValidation) {
        return res.status(400).json({ error: recurrenceValidation.message });
        
      }
    }
    


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
      recurrence
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

    export const getTasksByFilter = async (req, res) => {
       try {
        //  const { status, dueDate, dueDateBefore, dueDateAfter, assignedTo } = req.query;

        const { role,  id:userId } = req.user;
        const { status, dueDate, dueDateBefore, dueDateAfter, assignedTo } = req.body;

        // Validations
        if (dueDate) {
          const dueDateValidation = validate.dueDate(dueDate, 'dueDate');
          if (dueDateValidation) return res.status(400).json({ error: dueDateValidation.message });
        }
        if (dueDateBefore) {
          const dueDateBeforeValidation = validate.dueDate(dueDateBefore, 'dueDateBefore');
          if (dueDateBeforeValidation) return res.status(400).json({ error: dueDateBeforeValidation.message });
        }
        if (dueDateAfter) {
          const dueDateAfterValidation = validate.dueDate(dueDateAfter, 'dueDateAfter');
          if (dueDateAfterValidation) return res.status(400).json({ error: dueDateAfterValidation.message });
        }

        if(status ){
          const statusValidation = validate.enum(status, 'status', TASKSTATUS_VALUES);
          if (statusValidation) {
            return res.status(400).json({ error: statusValidation.message });
            
          }
        }



        const filters = {};
        
        if (status) {
          filters.status = status;
        }
        if(dueDate){
          filters.dueDate = dueDate;
        }
        if(dueDateBefore){
          filters.dueDate = { ...filters.dueDate, [Op.lte]: dueDateBefore };
        }
        if(dueDateAfter){
          filters.dueDate = { ...filters.dueDate , [Op.gte]: dueDateAfter };
        }
        if (assignedTo) {
            filters.assignedTo = parseInt(assignedTo);
        }

        // console.log("Filters:",filters)
        let tasks;
        if (role === ROLES.ADMIN) {
          tasks = await Task.findAll({
          where:  filters,
          order: [['createdAt', 'DESC']],
        });
        } else {
          if(assignedTo && parseInt(assignedTo) !== userId) {
            return res.status(403).json({ error: "Unauthorized to view tasks assigned to other users" });
          }
          tasks = await Task.findAll({ where: { ...filters,assignedTo: userId ,isDeleted:false} });
        }
        
        // console.log(tasks);
         return res.json(tasks);

       } catch (err) {
         res.status(500).json({ error: err.message });
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
    const { title, description, status, dueDate, assignedTo,recurrence } = req.body;

    // VALIDATIONS
    if(title){
      const titleValidation = validate.title(title, 'title', true);
      if (titleValidation) {
        return res.status(400).json({ error: titleValidation.message });
      }
    }
    if (dueDate) {
      const dueDateValidation = validate.dueDate(dueDate, 'dueDate');
      if (dueDateValidation) return res.status(400).json({ error: dueDateValidation.message });
    }

    if(status){
      const statusValidation = validate.enum(status, 'status', TASKSTATUS_VALUES);
      if (statusValidation) {
        return res.status(400).json({ error: statusValidation.message });
        
      }
    }

    if(recurrence){
      const recurrenceValidation = validate.enum(recurrence, 'recurrence', RECURRENCE_VALUES);
      if (recurrenceValidation) {
        return res.status(400).json({ error: recurrenceValidation.message });
        
      }
    }


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
    await task.update({ title, description, status, dueDate, assignedTo,recurrence });
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


