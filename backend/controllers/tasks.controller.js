import { db } from '../database/connection.js';

export async function getTasks(req, res) {
    try {
        const [rows] = await db.query('SELECT * FROM tasks');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }}

export async function createTask(req, res) {
    try {
        const values = [
            req.body.title,
            req.body.description,
            req.body.favorite,
        ];
        const [rows] = await db.query(
            'INSERT INTO tasks (title, description, favorite) VALUES (?, ?, ?)',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Task created successfully',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function updateTask(req, res) {
    try {
        const values = [
            req.body.title,
            req.body.description,
            req.body.favorite,
            req.params.id,
        ];
        const [rows] = await db.query(
            'UPDATE tasks SET title = ?, description = ?, favorite = ? WHERE id = ?',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function deleteTask(req, res) {
    try {
        const [rows] = await db.query(
            'DELETE FROM tasks WHERE id = ?',
            req.params.id
        );
        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

// activeTask table

export async function getActiveTask(req, res) {
    try {
        const [rows] = await db.query('SELECT * FROM activeTask');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function updateActiveTask(req, res) {
    try {
        const values = [req.body.taskId];
        const [rows] = await db.query(
            'UPDATE activeTask SET taskId = ? WHERE id = 1',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'Active task updated successfully',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}
