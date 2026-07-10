import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { io } from '../index';

const prisma = new PrismaClient();

export const getBoard = async (req: Request, res: Response) => {
  try {
    const { boardId } = req.params;
    let board = await prisma.board.findUnique({
      where: { id: boardId },
      include: {
        columns: {
          orderBy: { positionIndex: 'asc' },
          include: {
            tasks: {
              where: { deletedAt: null },
              orderBy: { positionIndex: 'asc' },
              include: { assignees: { include: { user: true } }, attachments: true, comments: true }
            }
          }
        }
      }
    });
    
    // Auto-seed for demo purposes if board doesn't exist
    if (!board) {
      board = await prisma.board.create({
        data: {
          id: boardId,
          name: 'Premium Kanban Board',
          columns: {
            create: [
              { title: 'To Do', positionIndex: 0 },
              { title: 'In Progress', positionIndex: 1 },
              { title: 'Review', positionIndex: 2 },
              { title: 'Done', positionIndex: 3 }
            ]
          }
        },
        include: { columns: { include: { tasks: true } } }
      });
    }
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { columnId, title, description, priority, dueDate } = req.body;
    
    // Find highest position index
    const lastTask = await prisma.task.findFirst({
      where: { columnId },
      orderBy: { positionIndex: 'desc' }
    });
    const positionIndex = lastTask ? lastTask.positionIndex + 1 : 0;

    const task = await prisma.task.create({
      data: { columnId, title, description, priority, dueDate, positionIndex },
      include: { assignees: true, attachments: true, comments: true }
    });
    
    // In a real app, you would emit a socket event here
    io.emit('taskMoved');
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const moveTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { targetColumnId, newIndex } = req.body;

    const taskToMove = await prisma.task.findUnique({ where: { id: taskId } });
    if (!taskToMove) return res.status(404).json({ error: 'Task not found' });

    // Transaction to update indices
    await prisma.$transaction(async (tx) => {
      // 1. Shift tasks in target column down to make room
      await tx.task.updateMany({
        where: { columnId: targetColumnId, positionIndex: { gte: newIndex } },
        data: { positionIndex: { increment: 1 } }
      });

      // 2. Move the task
      await tx.task.update({
        where: { id: taskId },
        data: { columnId: targetColumnId, positionIndex: newIndex }
      });

      // 3. Shift tasks in source column up to fill the gap (if we want to keep them tight)
      // Skipped for simplicity, as absolute ordering matters more than continuous integers
    });

    io.emit('taskMoved');
    res.json({ success: true, taskId, targetColumnId, newIndex });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { title, description, priority, dueDate } = req.body;
    const task = await prisma.task.update({
      where: { id: taskId },
      data: { title, description, priority, dueDate },
      include: { assignees: { include: { user: true } }, attachments: true, comments: true }
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
