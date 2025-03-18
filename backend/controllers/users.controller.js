import { db } from '../database/connection.js';

export async function getUsers(req, res) {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        return res.status(200).json(rows);
    } catch (error) {
        return res.json(error);
    }
}
