import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database is connected.");
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default dbConnect;

// import mongoose from "mongoose";
// const dbConnect = async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://TEST24:TEST24@cluster0.kkrhlqn.mongodb.net/TEST24"
//     );
//     console.log("Database is connected.");
//   } catch (error) {
//     console.log(error);
//   }
// };
// export default dbConnect;
