import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
    // console.log(process.env.MONGODB_URI)
  mongoose.set('strictQuery', true);

  if(isConnected) {
    return;
  }

  const URL:any = process.env.MONGODB_URI;

  try {
    await mongoose.connect(URL, {
      dbName: "through_us",
    })

    isConnected = true;

    console.log('MongoDB connected')
  } catch (error) {
    console.log(error);
  }
}