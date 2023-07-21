'use server';
import { ObjectId } from 'mongodb';
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
  return dbData;
};

// post new user
export const createNewUser = async (
  userName: string | null | undefined,
  userEmail: string | null | undefined,
  userPicture: string | null | undefined
): Promise<any> => {
  const newUser: User = {
    name: userName,
    email: userEmail,
    image: userPicture,
  };
  try {
    if (newUser.email) {
      const collection = client
        .db(databaseName)
        .collection(collectionNameUsers);
      await collection.insertOne(newUser);
    }
  } catch (err) {
    console.error(err);
  }
};

//Create a Route
export const createNewRide = async (
  userEmail: string | null | undefined,
  rideData: Ride
) => {
  const userCollection = client
    .db(databaseName)
    .collection(collectionNameUsers);
  const userData = await userCollection.findOne({ email: userEmail });

  rideData.driverId = String(userData?._id);
  rideData.driverName = userData?.name;

  const rideCollection = client
    .db(databaseName)
    .collection(collectionNameRides);
  await rideCollection.insertOne(rideData);
};

//Create a Request
export const createNewRequest = async (
  userEmail: string | null | undefined,
  rideData: Ride
) => {
  const userCollection = client
    .db(databaseName)
    .collection(collectionNameUsers);
  const userData = await userCollection.findOne({ email: userEmail });

  rideData.requestorId = String(userData?._id);
  rideData.requestorName = userData?.name;

  const rideCollection = client
    .db(databaseName)
    .collection(collectionNameRides);
  await rideCollection.insertOne(rideData);
};

// Get user created routes
export const getUserOfferedRoutes = async (
  userEmail: string | null | undefined
) => {
  const userCollection = client
    .db(databaseName)
    .collection(collectionNameUsers);
  const userData = await userCollection.findOne({ email: userEmail });

  const userId = String(userData?._id);

  const rideCollection = client
    .db(databaseName)
    .collection(collectionNameRides);
  const routeData = await rideCollection
    .find({ driverId: userId, isRequest: false })
    .toArray();
  return JSON.stringify(routeData);
};

// Get user requested routes
export const getUserRequestedRoutes = async (
  userEmail: string | null | undefined
) => {
  const userCollection = client
    .db(databaseName)
    .collection(collectionNameUsers);
  const userData = await userCollection.findOne({ email: userEmail });

  const requestorId = String(userData?._id);

  const rideCollection = client
    .db(databaseName)
    .collection(collectionNameRides);
  const routeData = await rideCollection
    .find({ requestorId: requestorId, isRequest: true })
    .toArray();
  return JSON.stringify(routeData);
};

//Post passenger to route
export const addPassengerToRoute = async (
  sessionEmail: string | null | undefined,
  uniqueId: string
) => {
  const userCollection = client
    .db(databaseName)
    .collection(collectionNameUsers);
  const userData = await userCollection.findOne({ email: sessionEmail });

  const newPaxId = String(userData?._id);
  const rideCollection = client
    .db(databaseName)
    .collection(collectionNameRides);

  const ride = await rideCollection.findOne({ _id: new ObjectId(uniqueId) });

  if (ride?.capacity <= ride?.passengers.length) {
    return; // ADDED CONDITIONAL
  }

  await rideCollection.updateOne(
    { _id: new ObjectId(uniqueId) },
    { $push: { passengers: newPaxId } }
  );
};

//Get my joined rides
export const getRidesJoinedByUser = async (
  userEmail: string | null | undefined
) => {
  const userCollection = client
    .db(databaseName)
    .collection(collectionNameUsers);
  const userData = await userCollection.findOne({ email: userEmail });

  const userId = String(userData?._id);

  const rideCollection = client
    .db(databaseName)
    .collection(collectionNameRides);

  const data = await rideCollection.find({ passengers: userId }).toArray();
  return JSON.stringify(data);
};

// Leave the joined ride
export const leaveJoinedRide = async (
  userEmail: string | null | undefined,
  uniqueId: string
) => {
  const userCollection = client
    .db(databaseName)
    .collection(collectionNameUsers);
  const userData = await userCollection.findOne({ email: userEmail });

  const userId = String(userData?._id);

  const rideCollection = client
    .db(databaseName)
    .collection(collectionNameRides);

  await rideCollection.updateOne(
    { _id: new ObjectId(uniqueId) },
    { $pull: { passengers: userId } }
  );
};

// Delete Route
export const deleteRoute = async (uniqueId: string) => {
  const rideCollection = client
    .db(databaseName)
    .collection(collectionNameRides);
  const result = await rideCollection.deleteOne({
    _id: new ObjectId(uniqueId),
  });
};

// leaveAllJoinedRides
export const leaveAllJoinedRide = async (
  userEmail: string | null | undefined
) => {
  const userCollection = client
    .db(databaseName)
    .collection(collectionNameUsers);
  const userData = await userCollection.findOne({ email: userEmail });

  const passengerId = String(userData?._id);

  const rideCollection = client
    .db(databaseName)
    .collection(collectionNameRides);

  await rideCollection.updateMany(
    { passengers: passengerId },
    { $pull: { passengers: passengerId } } // THIS ERROR MAKES NO SENSE
  );
};

// DeleteUser
export const deleteAllRoute = async (userEmail: string | undefined | null) => {
  const userCollection = client
    .db(databaseName)
    .collection(collectionNameUsers);
  const userData = await userCollection.findOne({ email: userEmail });

  const userId = String(userData?._id);

  const rideCollection = client
    .db(databaseName)
    .collection(collectionNameRides);

  await rideCollection.deleteMany({ driverId: userId });
  await rideCollection.deleteMany({ requestorId: userId });
};

// Delete user
export const deleteUser = async (userEmail: string | undefined | null) => {
  const userCollection = client
    .db(databaseName)
    .collection(collectionNameUsers);
  await userCollection.deleteOne({ email: userEmail });
};

//get all passengers
export const getAllPassengers = async (uniqueId: string) => {
  const rideCollection = client
    .db(databaseName)
    .collection(collectionNameRides);
  const result = await rideCollection.findOne({
    _id: new ObjectId(uniqueId),
  });

  const paxArray = (result?.passengers).map((id: string) => new ObjectId(id));
  const userCollection = client
    .db(databaseName)
    .collection(collectionNameUsers);

  const paxNames = await userCollection
    .find({ _id: { $in: paxArray } })
    .toArray();
  return JSON.stringify(paxNames);
};

//update User Pax Count

