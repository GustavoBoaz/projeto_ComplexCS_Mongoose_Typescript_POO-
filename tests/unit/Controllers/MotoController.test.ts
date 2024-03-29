import Sinon from 'sinon';
import request from 'supertest';
import app from '../../../src/app';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { motosOutputArray, updateInputMoto, updateOutputMoto, validIdInputMoto, validInputMoto, validOutputMoto } from '../../utils/MotoMock';

describe('Teste de controlador: Moto controller', function() {
  beforeEach(async () => {
    // GIVEN
    Sinon.stub(MotorcycleService.prototype, 'create').resolves(validOutputMoto);
    Sinon.stub(MotorcycleService.prototype, 'readAll').resolves(motosOutputArray);
    Sinon.stub(MotorcycleService.prototype, 'readOne').resolves(validOutputMoto);
    Sinon.stub(MotorcycleService.prototype, 'update').resolves(updateOutputMoto);
    Sinon.stub(MotorcycleService.prototype, 'delete').resolves();
  });

  afterEach(async () => {
    Sinon.restore();
  });

  it('Caso 1: Deve retornar status 201', async function () {
    await request(app)
      // WHEN
      .post('/motorcycles')
      .send(validInputMoto)
      // THEN
      .expect(201); 
  });

  it('Caso 2: Deve retornar status 200', async function () {
    await request(app)
      // WHEN
      .get('/motorcycles')
      // THEN
      .expect(200);
  });

  it('Caso 3: Deve retornar status 200', async function () {
    await request(app)
      // WHEN
      .get(`/motorcycles/${validIdInputMoto}`)
      // THEN
      .expect(200);
  });

  it('Caso 4: Deve retornar status 200', async function () {
    await request(app)
      // WHEN
      .put(`/motorcycles/${validIdInputMoto}`)
      .send(updateInputMoto)
      // THEN
      .expect(200);
  });

  it('Caso 5: Deve retornar status 204', async function () {
    await request(app)
      // WHEN
      .delete(`/motorcycles/${validIdInputMoto}`)
      // THEN
      .expect(204);
  });
});