import mongoose from 'mongoose';

const dbName = 'hadiah-nona';

// Use runtime config
const config = useRuntimeConfig();
const MONGODB_URI = config.mongoUri;

if (!MONGODB_URI) {
  throw new Error('Please define the mongoUri in nuxt.config.ts or NUXT_MONGO_URI in .env');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Fungsi untuk mendapatkan instance database
export async function getDb() {
  await connectDB();
  console.log('Connected to MongoDB');
  return mongoose.connection.db;
}

// Fungsi untuk mendapatkan nama database
export function getDatabaseName(): string {
  return dbName;
}

export default connectDB;