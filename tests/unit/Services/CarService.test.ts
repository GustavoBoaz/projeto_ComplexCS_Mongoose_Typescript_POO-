import { expect } from "chai";
import Sinon from "sinon";
import CarODM from "../../../src/Models/CarODM";
import CarService from "../../../src/Services/CarService";
import { carsOutputArray, iCarsOutputArray, iCarUpdateOutputCar, iCarValidOutputCar, updateInputCar, updateOutputCar, validIdInputCar, validInputCar, validOutputCar } from "../../utils/CarMock";


describe('Testes de serviços: Car', function() {
  afterEach(function () {
    Sinon.restore();
  });
  
  it('Caso 1: Deve criar um novo Car', async function () {
    // GIVEN - Dado
    Sinon.stub(CarODM.prototype, 'create').resolves(iCarValidOutputCar);

    // WHEN - Quando
    const service = new CarService();
    const result = await service.create(validInputCar);

    // THEN - Então
    expect(result).to.be.deep.equal(validOutputCar);
  });

  it('Caso 2: Deve retornar uma lista com 2 Cars', async function () {
    // GIVEN - Dado
    Sinon.stub(CarODM.prototype, 'find').resolves(iCarsOutputArray);

    // WHEN - Quando
    const service = new CarService();
    const result = await service.readAll();

    // THEN - Então
    expect(result).to.be.deep.equal(carsOutputArray);
    expect(result.length).to.be.equal(2);
  });

  it('Caso 3: Deve retornar 1 Car', async function () {
    // GIVEN - Dado
    Sinon.stub(CarODM.prototype, 'findById').resolves(iCarValidOutputCar);

    // WHEN - Quando
    const service = new CarService();
    const result = await service.readOne(validIdInputCar);

    // THEN - Então
    expect(result).to.be.deep.equal(validOutputCar);
  });

  it('Caso 4: Deve atualizar 1 Car', async function () {
    // GIVEN - Dado
    Sinon.stub(CarODM.prototype, 'update').resolves(iCarUpdateOutputCar);

    // WHEN - Quando
    const service = new CarService();
    const result = await service.update(validIdInputCar, updateInputCar);

    // THEN - Então
    expect(result).to.be.deep.equal(updateOutputCar);
  });

  it('Caso 5: Deve deletar 1 Car', async function () {
    // GIVEN - Dado
    Sinon.stub(CarODM.prototype, 'delete').resolves();
    Sinon.stub(CarService.prototype, 'readOne').resolves(validOutputCar);
    let result: boolean = false;

    try {
      // WHEN - Quando
      const service = new CarService();
      await service.delete(validIdInputCar);
      result = true;
    } catch (error) {
      result = false;
    }

    // THEN - Então
    expect(result).to.be.true;
  });

  it('Caso 6: Deve ler "Car not found" quando não encontrar Car ao listar 1 Car', async function () {
    // GIVEN - Dado
    Sinon.stub(CarODM.prototype, 'findById').resolves();

    try {
      // WHEN - Quando
      const service = new CarService();
      const result = await service.readOne('ID_CAR_NOT_FOUND');
    } catch (error) {
      // THEN - Então
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });

  it('Caso 7: Deve ler "Car not found" quando não encontrar Car ao atualiar 1 Car', async function () {
    // GIVEN - Dado
    Sinon.stub(CarODM.prototype, 'update').resolves();

    try {
      // WHEN - Quando
      const service = new CarService();
      const result = await service.update('ID_CAR_NOT_FOUND', updateInputCar);
    } catch (error) {
      // THEN - Então
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });
});