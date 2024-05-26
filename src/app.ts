import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

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
