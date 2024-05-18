import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentsRoutes } from './app/modules/students/student.route';

const app: Application = express();
// const port = 3000

// parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/v1/students', StudentsRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.json(a);
};

app.get('/', getAController);

export default app;
