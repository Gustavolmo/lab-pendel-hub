import { v4 as uuidv4 } from 'uuid'
import { client } from '../mongoConnect';

const generateId = () => uuidv4();
const databaseName = 'pendel-hub'
const collectionNameUsers = 'users'
const collectionNameRoutes = 'routes'

// get user
export const getUserByEmail = async (userEmail: string) => {
  const collection = client.db(databaseName).collection(collectionNameUsers);
  const userData = await collection.findOne({ userEmail })
  return userData
}

// post new user
export const createNewUser = async (userName: string, userEmail: string, userPicture: string): Promise<any> => {
  const newUser: any = {
    userId: generateId(),
    name: userName,
    email: userEmail,
    image: userPicture
  };
  try {
    const collection = client.db(databaseName).collection(collectionNameUsers);
    await collection.insertOne(newUser);
  } catch (err) {
    console.error(err)
  }
  return newUser;
};

export default {
  getUserByEmail,
  createNewUser
}
