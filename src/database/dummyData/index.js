import user from './user';

const createDummyData = async () => {
  console.log('Creating dummy data...');
 await user();
 
  console.log('Dummy data created');
}; 

export default createDummyData;