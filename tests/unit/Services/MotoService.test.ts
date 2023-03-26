import { expect } from "chai";
import Sinon from "sinon";
import MotorcycleODM from "../../../src/Models/MotorcycleODM";
import MotorcycleService from "../../../src/Services/MotorcycleService";
import { iMotosOutputArray, iMotoUpdateOutputMoto, iMotoValidOutputMoto, motosOutputArray, updateInputMoto, updateOutputMoto, validIdInputMoto, validInputMoto, validOutputMoto } from "../../utils/MotoMock";

describe('Testes de serviços: Motorcycle', function() {
  afterEach(function () {
    Sinon.restore();
  });
  
  it('Caso 1: Deve criar um novo Motorcycle', async function () {
    // GIVEN - Dado
    Sinon.stub(MotorcycleODM.prototype, 'create').resolves(iMotoValidOutputMoto);

    // WHEN - Quando
    const service = new MotorcycleService();
    const result = await service.create(validInputMoto);

    // THEN - Então
    expect(result).to.be.deep.equal(validOutputMoto);
  });

  it('Caso 2: Deve retornar uma lista com 2 Motos', async function () {
    // GIVEN - Dado
    Sinon.stub(MotorcycleODM.prototype, 'find').resolves(iMotosOutputArray);

    // WHEN - Quando
    const service = new MotorcycleService();
    const result = await service.readAll();

    // THEN - Então
    expect(result).to.be.deep.equal(motosOutputArray);
    expect(result.length).to.be.equal(2);
  });

  it('Caso 3: Deve retornar 1 Motorcycle', async function () {
    // GIVEN - Dado
    Sinon.stub(MotorcycleODM.prototype, 'findById').resolves(iMotoValidOutputMoto);

    // WHEN - Quando
    const service = new MotorcycleService();
    const result = await service.readOne(validIdInputMoto);

    // THEN - Então
    expect(result).to.be.deep.equal(validOutputMoto);
  });

  it('Caso 4: Deve atualizar 1 Motorcycle', async function () {
    // GIVEN - Dado
    Sinon.stub(MotorcycleODM.prototype, 'update').resolves(iMotoUpdateOutputMoto);

    // WHEN - Quando
    const service = new MotorcycleService();
    const result = await service.update(validIdInputMoto, updateInputMoto);

    // THEN - Então
    expect(result).to.be.deep.equal(updateOutputMoto);
  });

  it('Caso 5: Deve deletar 1 Motorcycle', async function () {
    // GIVEN - Dado
    Sinon.stub(MotorcycleODM.prototype, 'delete').resolves();
    Sinon.stub(MotorcycleService.prototype, 'readOne').resolves(validOutputMoto);
    let result: boolean = false;

    try {
      // WHEN - Quando
      const service = new MotorcycleService();
      await service.delete(validIdInputMoto);
      result = true;
    } catch (error) {
      result = false;
    }

    // THEN - Então
    expect(result).to.be.true;
  });

  it('Caso 6: Deve ler "Motorcycle not found" quando não encontrar Motorcycle ao listar 1 Motorcycle', async function () {
    // GIVEN - Dado
    Sinon.stub(MotorcycleODM.prototype, 'findById').resolves();

    try {
      // WHEN - Quando
      const service = new MotorcycleService();
      const result = await service.readOne('ID_CAR_NOT_FOUND');
    } catch (error) {
      // THEN - Então
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });

  it('Caso 7: Deve ler "Motorcycle not found" quando não encontrar Motorcycle ao atualiar 1 Motorcycle', async function () {
    // GIVEN - Dado
    Sinon.stub(MotorcycleODM.prototype, 'update').resolves();

    try {
      // WHEN - Quando
      const service = new MotorcycleService();
      const result = await service.update('ID_CAR_NOT_FOUND', updateInputMoto);
    } catch (error) {
      // THEN - Então
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });
});