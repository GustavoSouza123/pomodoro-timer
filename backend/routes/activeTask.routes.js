import express from 'express';
import {
    getActiveTask,
    updateActiveTask,
} from '../controllers/tasks.controller.js';

const router = express.Router();

router.get('/', getActiveTask);
router.put('/', updateActiveTask);

export default router;
