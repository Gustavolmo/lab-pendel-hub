'use server';
import { client, runMongoDb } from '../mongoConnect';
import { User } from '../types/types';

runMongoDb();
const databaseName = 'pendel-hub';
const collectionNameUsers = 'users';
const collectionNameRoutes = 'routes';

// get user by email
export const getUserByEmail = async (userEmail: string | null | undefined) => {
  const collection = client.db(databaseName).collection(collectionNameUsers);
  const dbData = await collection.findOne({ email: userEmail });
  return dbData
};

// post new user
export const createNewUser = async (
  userName: string | null | undefined,
  userEmail: string | null | undefined,
  userPicture: string | null | undefined,
): Promise<any> => {
  const newUser: User = {
    name: userName,
    email: userEmail,
    image: userPicture,
  };
  try {
    if(newUser.email){
      const collection = client.db(databaseName).collection(collectionNameUsers);
      await collection.insertOne(newUser);
    }
  } catch (err) {
    console.error(err);
  }
};

