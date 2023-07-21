'use server'
import { client, runMongoDb } from '../mongoConnect';

runMongoDb()

const databaseName = 'pendel-hub';
const collectionNameUsers = 'users';
const collectionNameRides = 'routes';

//get all routes
export const getAllOfferedRoutes = async () => {
  const userCollection = client.db(databaseName).collection(collectionNameRides);
  const rideData = await userCollection.find({isRequest: false}).toArray();
  return JSON.stringify(rideData)
}

//get all requested routes
export const getAllRequestedRoutes = async () => {
  const userCollection = client.db(databaseName).collection(collectionNameRides);
  const rideData = await userCollection.find({isRequest: true}).toArray();
  return JSON.stringify(rideData)
}
