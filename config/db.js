import mongoConnect from 'mongoose';

connectDB().catch(err => console.log(err));

async function connectDB() {
  await mongoConnect.connect(
    "mongodb+srv://hkynuggggg_db_user:alorsOnDanse@bros-vouchers.sgzbjuy.mongodb.net/?retryWrites=true&w=majority&appName=bros-vouchers",
    { dbName: "bros-vouchers" }
  );
}

export default connectDB;