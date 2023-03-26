import GenericError from '../Domains/Errors/GenericError';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import IService from '../Interfaces/IService';
import MotorcycleODM from '../Models/MotorcycleODM';

const ID_NOT_FOUND = 'Motorcycle not found';

class MotorcycleService implements IService<IMotorcycle, Motorcycle> {
  protected odm: MotorcycleODM = new MotorcycleODM();

  async create(dto: IMotorcycle): Promise<Motorcycle> {
    const motorcycle = await this.odm.create(dto);
    return new Motorcycle(motorcycle);
  }

  async readAll(): Promise<Motorcycle[]> {
    const motorcycles = await this.odm.find();
    return motorcycles.map((motorcycle) => new Motorcycle(motorcycle));
  }

  async readOne(id: string): Promise<Motorcycle> {
    const motorcycles = await this.odm.findById(id);
    if (!motorcycles) throw new GenericError(404, ID_NOT_FOUND);
    return new Motorcycle(motorcycles);
  }

  async update(id: string, dto: IMotorcycle): Promise<Motorcycle> {
    const motorcycles = await this.odm.update(id, dto);
    if (!motorcycles) throw new GenericError(404, ID_NOT_FOUND);
    return new Motorcycle(motorcycles);
  }

  async delete(id: string): Promise<void> {
    await this.readOne(id);
    await this.odm.delete(id);
  }
}

export default MotorcycleService;