import Motorcycle from "../../src/Domains/Motorcycle";
import IMotorcycle from "../../src/Interfaces/IMotorcycle";

export const validIdInputMoto: string = '634852326b35b59438fbea2f';

export const validInputMoto: IMotorcycle = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600
};

export const validOutputMoto: Motorcycle = new Motorcycle({
  id: '634852326b35b59438fbea2f',
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600
});

export const iMotoValidOutputMoto: IMotorcycle = {
  id: '634852326b35b59438fbea2f',
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600
};

export const updateInputMoto: IMotorcycle = {
  id: '634852326b35b59438fbea2f',
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Black',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600
};

export const updateOutputMoto: Motorcycle = new Motorcycle({
  id: '634852326b35b59438fbea2f',
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'black',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600
});

export const iMotoUpdateOutputMoto: IMotorcycle = {
  id: '634852326b35b59438fbea2f',
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'black',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600
};

export const motosOutputArray = [
  new Motorcycle({
    id: '634852326b35b59438fbea2f',
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600
  }),
  new Motorcycle({
    id: '634852326b35b59438fbec3e',
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Blue',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600
  }),
];

export const iMotosOutputArray = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600
  } as IMotorcycle,
  {
    id: '634852326b35b59438fbec3e',
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Blue',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600
  } as IMotorcycle,
];