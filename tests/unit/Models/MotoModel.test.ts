import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import { motosOutputArray, updateInputMoto, updateOutputMoto, validIdInputMoto, validInputMoto, validOutputMoto } from '../../utils/MotoMock';

describe('Testes de ODM: Motorcycle', function() {
  afterEach(function () {
    Sinon.restore();
  });

  it('Caso 1: Deve criar 1 Motorcycle', async function () {
    // GIVEN - Dado
    Sinon.stub(Model, 'create').resolves(validOutputMoto);

    // WHEN - Quando
    const odm = new MotorcycleODM();
    const result = await odm.create(validInputMoto);
    // THEN - Então
    expect(result).to.be.equal(validOutputMoto);
  });

  it('Caso 2: Deve ler uma lista com 2 Motorcycles', async function () {
    // GIVEN - Dado
    Sinon.stub(Model, 'find').resolves(motosOutputArray);

    // WHEN - Quando
    const odm = new MotorcycleODM();
    const result = await odm.find();

    // THEN - Então
    expect(result.length).to.be.equal(2);
  });

  it('Caso 3: Deve ler 1 Motorcycle', async function () {
    // GIVEN - Dado
    Sinon.stub(Model, 'findById').resolves(validOutputMoto);

    // WHEN - Quando
    const odm = new MotorcycleODM();
    const result = await odm.findById(validIdInputMoto);

    // THEN - Então
    expect(result).to.be.equal(validOutputMoto);
  });

  it('Caso 4: Deve atualizar 1 Motorcycle', async function () {
    // GIVEN - Dado
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(updateOutputMoto);

    // WHEN - Quando
    const odm = new MotorcycleODM();
    const result = await odm.update(validIdInputMoto, updateInputMoto);

    // THEN - Então
    expect(result).to.be.equal(updateOutputMoto);
  });

  it('Caso 5: Deve deletar o Motorcycle', async function () {
    // GIVEN - Dado
    Sinon.stub(Model, 'findByIdAndRemove').resolves();
    let result: boolean = false;

    try {
      // WHEN - Quando
      const odm = new MotorcycleODM();
      await odm.delete(validIdInputMoto);
      result = true;
    } catch (error) {
      result = false;
    }

    // THEN - Então
    expect(result).to.be.true;
  });

  it('Caso 6: Deve ler "Invalid mongo id" quando ler um Motorcycle com id mal formatado', async function () {
    // GIVEN - Dado

    try {
      // WHEN - Quando
      const odm = new MotorcycleODM();
      await odm.findById('INVALID_FORMAT_ID');
    } catch (error) {
      // THEN - Então
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('Caso 7: Deve ler "Invalid mongo id" quando atualizar um Motorcycle com id mal formatado', async function () {
    // GIVEN - Dado

    try {
      // WHEN - Quando
      const odm = new MotorcycleODM();
      await odm.update('INVALID_FORMAT_ID', updateInputMoto);
    } catch (error) {
      // THEN - Então
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });
});