import { User, UserCredential } from '../../models/index';
import bcrypt from 'bcryptjs';

const createUsers = async () => {
  
  const user = {
    fullname: 'Sysadmin',
    email: 'admin@agrocontrol.com', 
    password: 'admin'
  };

  const userCreated = await User.create({
    fullname: user.fullname,
    email: user.email,
  });

  const hashedPassword = await bcrypt.hash(user.password, 10);

  await UserCredential.create({
    password: hashedPassword,
    userId: userCreated.id,
  }); 

}; 

export default createUsers;

 