'use server'
import { client, runMongoDb } from '../mongoConnect';
import { Ride, User } from '../types/types';

runMongoDb()

const databaseName = 'pendel-hub';
const collectionNameUsers = 'users';
const collectionNameRides = 'routes';

//get all routes
export const getAllRoutes = async () => {
  const userCollection = client.db(databaseName).collection(collectionNameRides);
  const rideData = await userCollection.find({}).toArray();
  return JSON.stringify(rideData)
}
