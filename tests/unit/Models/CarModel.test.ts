import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarODM from '../../../src/Models/CarODM';
import { carsOutputArray, updateInputCar, updateOutputCar, validIdInputCar, validInputCar, validOutputCar } from '../../utils/CarMock';

describe('Testes de ODM: Car', function() {
  afterEach(function () {
    Sinon.restore();
  });

  it('Caso 1: Deve criar 1 Car', async function () {
    // GIVEN - Dado
    Sinon.stub(Model, 'create').resolves(validOutputCar);

    // WHEN - Quando
    const odm = new CarODM();
    const result = await odm.create(validInputCar);
    // THEN - Então
    expect(result).to.be.equal(validOutputCar);
  });

  it('Caso 2: Deve ler uma lista com 2 Cars', async function () {
    // GIVEN - Dado
    Sinon.stub(Model, 'find').resolves(carsOutputArray);

    // WHEN - Quando
    const odm = new CarODM();
    const result = await odm.find();

    // THEN - Então
    expect(result.length).to.be.equal(2);
  });

  it('Caso 3: Deve ler 1 Car', async function () {
    // GIVEN - Dado
    Sinon.stub(Model, 'findById').resolves(validOutputCar);

    // WHEN - Quando
    const odm = new CarODM();
    const result = await odm.findById(validIdInputCar);

    // THEN - Então
    expect(result).to.be.equal(validOutputCar);
  });

  it('Caso 4: Deve atualizar 1 Car', async function () {
    // GIVEN - Dado
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(updateOutputCar);

    // WHEN - Quando
    const odm = new CarODM();
    const result = await odm.update(validIdInputCar, updateInputCar);

    // THEN - Então
    expect(result).to.be.equal(updateOutputCar);
  });

  it('Caso 5: Deve deletar o Car', async function () {
    // GIVEN - Dado
    Sinon.stub(Model, 'findByIdAndRemove').resolves();
    let result: boolean = false;

    try {
      // WHEN - Quando
      const odm = new CarODM();
      await odm.delete(validIdInputCar);
      result = true;
    } catch (error) {
      result = false;
    }

    // THEN - Então
    expect(result).to.be.true;
  });

  it('Caso 6: Deve ler "Invalid mongo id" quando ler um Car com id mal formatado', async function () {
    // GIVEN - Dado

    try {
      // WHEN - Quando
      const odm = new CarODM();
      await odm.findById('INVALID_FORMAT_ID');
    } catch (error) {
      // THEN - Então
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('Caso 7: Deve ler "Invalid mongo id" quando atualizar um Car com id mal formatado', async function () {
    // GIVEN - Dado

    try {
      // WHEN - Quando
      const odm = new CarODM();
      await odm.update('INVALID_FORMAT_ID', updateInputCar);
    } catch (error) {
      // THEN - Então
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });
});