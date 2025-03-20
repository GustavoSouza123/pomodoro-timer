import express from 'express';
import {
    createSession,
    deleteSession,
    getSessions,
    updateSession,
} from '../controllers/sessions.controller.js';

const router = express.Router();

router.get('/', getSessions);
router.post('/', createSession);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);

export default router;
