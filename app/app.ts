import express from 'express';
import {router as userRoutes} from './src/routes/user.routes';

const API_PREFIX = '/api';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(`${API_PREFIX}/v1/users`, userRoutes);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});