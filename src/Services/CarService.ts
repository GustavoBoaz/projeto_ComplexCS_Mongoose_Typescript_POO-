import Car from '../Domains/Car';
import GenericError from '../Domains/Errors/GenericError';
import ICar from '../Interfaces/ICar';
import IService from '../Interfaces/IService';
import CarODM from '../Models/CarODM';

const ID_NOT_FOUND = 'Car not found';

class CarService implements IService<ICar, Car> {
  protected odm: CarODM = new CarODM();

  async create(dto: ICar): Promise<Car> {
    const car = await this.odm.create(dto);
    return new Car(car);
  }

  async readAll(): Promise<Car[]> {
    const cars = await this.odm.find();
    return cars.map((car) => new Car(car));
  }

  async readOne(id: string): Promise<Car> {
    const car = await this.odm.findById(id);
    if (!car) throw new GenericError(404, ID_NOT_FOUND);
    return new Car(car);
  }
  
  async update(id: string, dto: ICar): Promise<Car> {
    const car = await this.odm.update(id, dto);
    if (!car) throw new GenericError(404, ID_NOT_FOUND);
    return new Car(car);
  }

  async delete(id: string): Promise<void> {
    await this.readOne(id);
    await this.odm.delete(id);
  }
}

export default CarService;
