import mongoose from "mongoose";
import dotenv from "dotenv";

export class ServerConfiguration {
  static mongoDB() {
    dotenv.config();

    if (!process.env.MONGO_DB) {
      throw new Error("please create .env file as .env.example");
    }
    mongoose
      .connect(process.env.MONGO_DB, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() =>
        console.log(
          `
       State of connection to DB- ${mongoose.connection.readyState} 
       0 = disconnected
       1 = connected
       2 = connecting 
       3 = disconnecting
      `
        )
      );
  }

}
