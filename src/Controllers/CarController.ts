import { NextFunction, Request, Response, Router } from 'express';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import IService from '../Interfaces/IService';
import CarService from '../Services/CarService';
import AController from './AController';

const URI_BASE_API = '/cars';
const URI_ID_API = '/cars/:id';

class CarController extends AController<IService<ICar, Car>> {
  constructor() {
    super(new CarService());
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  private async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.readAll();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  private async readById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.readOne(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  private async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.update(req.params.id, req.body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  private async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.delete(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  initRoutes(): Router {
    this.router.post(URI_BASE_API, (req, res, next) => this.create(req, res, next));
    this.router.get(URI_BASE_API, (req, res, next) => this.readAll(req, res, next));
    this.router.get(URI_ID_API, (req, res, next) => this.readById(req, res, next));
    this.router.put(URI_ID_API, (req, res, next) => this.update(req, res, next));
    this.router.delete(URI_ID_API, (req, res, next) => this.delete(req, res, next));
    return this.router;
  }
}

export default CarController;