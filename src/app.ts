import express, { Request, Response, Application } from 'express';
const app: Application = express();
const port = 3000;
import cors from 'cors';

// parser for json data
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;

