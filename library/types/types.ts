export type User = {
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
};

export type Ride = {
  driverId: string; // IS THERE A WAY TO CONNECT TO USER?
  passengerId: string;
  createdDate: string; // MIND THE DATE TYPE
  availableFromDate: string; // MIND THE DATE TYPE
  pointA: string;
  pointB: string;
  timeFromA: string;
  timeFromB: string;
  tripTime: string;
  passengers: string[];
  frequency: string;
  message: string;
  carDescription: string;
  fare?: number;
  isRequest?: boolean;
};
