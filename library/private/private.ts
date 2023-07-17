'use server';
import { v4 as uuidv4 } from 'uuid';
import { client, runMongoDb } from '../mongoConnect';

runMongoDb(); // IS THIS THE CORRECT PLACE?

// const generateId = () => uuidv4();
const databaseName = 'pendel-hub';
const collectionNameUsers = 'users';
const collectionNameRoutes = 'routes';

export type User = {
  // userId: string // CONSIDER REMOVING IT
  name: string;
  email: string;
  image: string;
};

// get user by email
export const getUserByEmail = async (userEmail: string | null | undefined) => {
  const collection = client.db(databaseName).collection(collectionNameUsers);
  return await collection.findOne({ email: userEmail });
};

// post new user
export const createNewUser = async (
  userName: string,
  userEmail: string,
  userPicture: string
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


// export const createUserIfNotInDb = async (userSession: any) => {
  
//   console.log(userSession)
//   console.log(userSession)
//   const sessionEmail = userObject?.email;
  
//   const collection = client.db(databaseName).collection(collectionNameUsers);
//   const user = await collection.findOne({ email: sessionEmail });
//   console.log(user);

//   if (user) {
//     console.log('USER EXISTS');
//     return;

//   } else {
//     await collection.insertOne(userObject);
//     console.log('NEW USER');
//     return;
//   }
// };
