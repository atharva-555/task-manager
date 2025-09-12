import express from 'express';
import { createTask,getAllTasks,deleteTask, getTaskById,updateTask,getTasksByFilter} from '../controllers/taskController.js';
import auth from '../middleware/auth.js';
import {roleGuard} from '../middleware/roleGuard.js';

const router = express.Router();
router.use(auth);
router.post('/createTask',roleGuard(['admin','user']),createTask);
router.get('/getAllTasks',roleGuard(['admin','user']),getAllTasks);
router.get('/getTasksByFilter',roleGuard(['admin','user']),getTasksByFilter);
router.get('/getTaskById/:id',roleGuard(['admin','user']),getTaskById);
router.delete('/deleteTask/:id',roleGuard(['admin']),deleteTask);
router.put('/updateTask/:id',roleGuard(['admin','user']),updateTask);
// router.post('/:id/assignTask',roleGuard(['admin']),assignTask);

export default router;