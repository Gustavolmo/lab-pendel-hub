import { ObjectId } from "mongodb";

export type User = {
  _id?: ObjectId;
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
};

export type Ride = {
  _id?: ObjectId;
  driverId: string; // IS THERE A WAY TO CONNECT TO USER?
  driverName: string,
  requestorId: string;
  requestorName: string;
  createdDate: string; // MIND THE DATE TYPE
  availableFromDate: string; // MIND THE DATE TYPE
  pointA: string;
  pointB: string;
  timeFromA: string;
  timeFromB: string;
  tripTime: string;
  passengers: string[];
  capacity: number;
  frequency: string;
  message: string;
  carDescription: string;
  fare?: number;
  isRequest?: boolean;
};
