import express from 'express';
import cors from 'cors';

import userRoutes from './routes/users.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import sessionsRoutes from './routes/sessions.routes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/tasks', tasksRoutes);
app.use('/sessions', sessionsRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server running!' });
});

app.listen(8000, () => {
    console.log(`Server running on http://localhost:8000`);
});
