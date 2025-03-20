import { db } from '../database/connection.js';

export async function getSessions(req, res) {
	try {
		const [rows] = await db.query('SELECT * FROM sessions');
		return res.status(200).json(rows);
	} catch (error) {
		return res.json(error);
	}
}

export async function createSession(req, res) {
	try {
		const values = [req.body.taskId, req.body.time];
		const [rows] = await db.query(
			'INSERT INTO sessions (taskId, time) VALUES (?, ?)',
			values
		);
		return res.status(200).json({
			success: true,
			message: 'Session created successfully',
			rows,
		});
	} catch (error) {
		return res.json(error);
	}
}

export async function updateSession(req, res) {
	try {
		const values = [req.body.taskId, req.body.time, req.params.id];
		const [rows] = await db.query(
			'UPDATE sessions SET taskId = ?, time = ? WHERE id = ?',
			values
		);
		return res.status(200).json({
			success: true,
			message: 'Session updated successfully',
			rows,
		});
	} catch (error) {
		return res.json(error);
	}
}

export async function deleteSession(req, res) {
	try {
		const [rows] = await db.query(
			'DELETE FROM sessions WHERE id = ?',
			req.params.id
		);
		return res.status(200).json({
			success: true,
			message: 'Session deleted successfully',
			rows,
		});
	} catch (error) {
		return res.json(error);
	}
}
