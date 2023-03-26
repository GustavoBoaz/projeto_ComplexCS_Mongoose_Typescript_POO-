import { NextFunction, Request, Response, Router } from 'express';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import IService from '../Interfaces/IService';
import MotorcycleService from '../Services/MotorcycleService';
import AController from './AController';

const URI_BASE_API = '/motorcycles';
const URI_ID_API = '/motorcycles/:id';

class MotorcycleController extends AController<IService<IMotorcycle, Motorcycle>> {
  constructor() {
    super(new MotorcycleService());
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

export default MotorcycleController;