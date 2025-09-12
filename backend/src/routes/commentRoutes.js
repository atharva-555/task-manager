import express from 'express';
import { addComment,deleteComment,getCommentByTask } from '../controllers/commentController.js';
import auth from '../middleware/auth.js';
import {roleGuard} from '../middleware/roleGuard.js';

const router = express.Router();

router.use(auth);
router.post('/addComment',roleGuard(['admin','user']),addComment);
router.get('/getCommentByTask',roleGuard(['admin','user']),getCommentByTask);
router.delete('/deleteComment',roleGuard(['admin','user']),deleteComment);

export default router;