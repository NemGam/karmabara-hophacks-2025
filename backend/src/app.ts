import express, { json } from 'express';
import { router as userRoutes } from '@routes/user.routes';
import { router as achievementsRoutes } from '@routes/achievements.routes';
import { router as eventsRoutes } from '@routes/events.routes';
import { errorHandler } from './app/middleware/errorHandler.middleware';
import cors from 'cors';

const API_PREFIX = '/api';

const app = express();
app.use(cors());
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/', (req, res, next) => {
    console.log(req.url);
    next();
});
app.use(json());
app.use(`${API_PREFIX}/v1/users`, userRoutes);
app.use(`${API_PREFIX}/v1/achievements`, achievementsRoutes);
app.use(`${API_PREFIX}/v1/events`, eventsRoutes);

app.use(errorHandler);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
