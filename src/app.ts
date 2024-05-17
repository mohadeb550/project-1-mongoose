import express, { Request, Response, Application } from 'express';
const app: Application = express();
const port = 3000;
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';

// parser for json data
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', StudentRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
