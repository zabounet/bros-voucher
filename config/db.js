import mongoConnect from 'mongoose';
dotenv.config();

connectDB().catch(err => console.log(err));

async function connectDB() {
  await mongoConnect.connect(
    process.env.MONGO_URI,
    { dbName: process.env.DB_NAME }
  );
}

export default connectDB;