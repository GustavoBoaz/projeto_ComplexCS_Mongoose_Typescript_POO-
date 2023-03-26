import express, { Router } from 'express';

/**
 * @author Gustavo Boaz
 * 
 * @description Classe abstrata para controladores
 * utilizada para trabalhar com rotas
 * @argument S Passe um contrato de serviço
 * 
 * @property router 
 * @property service
 * 
 * @constructor Inicializa um objeto router. Você pode
 * manipular o atributo router para gerar as rotas
 * 
 * @method initRoutes(): Utilizar para inicializar rotas
 * 
 * @see express.Router
 */
abstract class AController<S> {
  router: express.Router;
  service: S;

  constructor(service: S) {
    this.router = Router();
    this.service = service;
  }

  /**
   * Inicialize as rotas necessarias para sua aplicação
   * @example
   *    initRoutes(): express.Router {
   *      this.router.post('/todo', (req, res, next) => this.create(req, res, next));
   *      this.router.get('/todo', (req, res, next) => this.read(req, res, next));
   *      this.router.put('/todo', (req, res, next) => this.update(req, res, next));
   *      this.router.delete('/todo', (req, res, next) => this.create(req, res, next));
   *      return this.router;
   *    }
   * @returns Router: Retorna um objeto router para a aplicação
   */
  abstract initRoutes(): Router;
}

export default AController;
