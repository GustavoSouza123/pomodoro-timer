import { db } from '../database/connection.js';

export async function getUsers(req, res) {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}

export async function createUser(req, res) {
    try {
        const values = [req.body.name, req.body.email, req.body.password];
        const [rows] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'User created successfully',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function updateUser(req, res) {
    try {
        const values = [req.body.name, req.body.email, req.body.password, req.params.id];
        const [rows] = await db.query(
            'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
            values
        );
        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}

export async function deleteUser(req, res) {
    try {
        const [rows] = await db.query(
            'DELETE FROM users WHERE id = ?',
            req.params.id
        );
        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            rows,
        });
    } catch (error) {
        return res.json(error);
    }
}
