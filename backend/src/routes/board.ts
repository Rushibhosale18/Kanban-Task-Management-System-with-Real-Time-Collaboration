import express from 'express';
import { getBoard, moveTask, createTask, updateTask } from '../controllers/board';

const router = express.Router();

router.get('/:boardId', getBoard);
router.post('/tasks', createTask);
router.patch('/tasks/:taskId/move', moveTask);
router.patch('/tasks/:taskId', updateTask);

export default router;
