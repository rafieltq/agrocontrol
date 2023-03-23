import { Manager } from '../../models/index';

const createManager = async () => {
  
  const ManagerCreate = {
    full_name: 'Joaquin Reynoso',
    email: 'joaquinR@agrocontrol.com', 
    phone_number: '8094770243'
  };

  await Manager.create({
    full_name: ManagerCreate.full_name,
    email: ManagerCreate.email,
    phone_number: ManagerCreate.phone_number,
  });
}; 

export default createManager;

 