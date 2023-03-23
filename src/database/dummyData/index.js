import user from './user';
import Manager from './manager';


const createDummyData = async () => {
  console.log('Creating dummy data...');
  await user();
  await Manager();
 
  console.log('Dummy data created');
}; 

export default createDummyData;