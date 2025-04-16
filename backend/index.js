import express from 'express';
import cors from 'cors';

import userRoutes from './routes/users.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import sessionsRoutes from './routes/sessions.routes.js';

const app = express();
const port = process.env.PORT | 8080;

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/sessions', sessionsRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server running!' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
