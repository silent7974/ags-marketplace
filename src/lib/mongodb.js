import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI;  
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env")
}

if (process.env.NODE_ENV === "development") {
  // In dev, use a global variable for hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, don't use global
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;