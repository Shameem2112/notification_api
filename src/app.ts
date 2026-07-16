import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import notificationRoutes from './routes/notification.routes';
import { errorHandler, notFound } from './middlewares/errorHandler';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Notification API is running' });
});

app.use('/api/notifications', notificationRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
