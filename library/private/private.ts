'use server';
import { client, runMongoDb } from '../mongoConnect';
import { Ride, User } from '../types/types';

runMongoDb();
const databaseName = 'pendel-hub';
const collectionNameUsers = 'users';
const collectionNameRides = 'routes';

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

//Create a Route
export const createNewRide = async (userEmail: string | null | undefined, rideData: Ride) => {

  const userCollection = client.db(databaseName).collection(collectionNameUsers);
  const userData = await userCollection.findOne({ email: userEmail });

  rideData.driverId = String(userData?._id)
  console.log(rideData)

  const rideCollection = client.db(databaseName).collection(collectionNameRides);
  await rideCollection.insertOne(rideData);
}

// Get user created routes
export const getUserRoutes = async (userEmail: string | null | undefined) => {

  const userCollection = client.db(databaseName).collection(collectionNameUsers);
  const userData = await userCollection.findOne({ email: userEmail });
  console.log(userData)

  const userId = String(userData?._id)

  const rideCollection = client.db(databaseName).collection(collectionNameRides);
  const routeData = await rideCollection.find({driverId: userId}).toArray();
  return JSON.stringify(routeData)
}
