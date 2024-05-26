import express, { Request, Response, Application, NextFunction } from 'express';
const app: Application = express();
const port = 3000;
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';


// parser for json data
app.use(express.json());
app.use(cors());




// application routes
app.use('/api/v1', router);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// global error handler 
app.use(globalErrorHandler)

// not found handler 
app.use(notFound)

export default app;


