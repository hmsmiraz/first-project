import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentsRoutes } from './app/modules/students/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/modules/middlewares/globalErrorHandler';
import notFound from './app/modules/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  res.send(`Welcome PH University Management System Backend`);
};
app.get('/', test);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
