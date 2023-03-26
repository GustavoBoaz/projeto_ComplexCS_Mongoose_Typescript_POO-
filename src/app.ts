import express from 'express';
import CarController from './Controllers/CarController';
import MotorcycleController from './Controllers/MotorcycleController';
import ErrorHandler from './Middlewares/ErrorHandler';

const app = express();
app.use(express.json());
app.use(new CarController().initRoutes());
app.use(new MotorcycleController().initRoutes());
app.use(new ErrorHandler().handler);

export default app;
