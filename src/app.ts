import express from "express";
import router from "./routers/index";
import { ServerConfiguration } from "./config/server.config";


const app = express();
const port = process.env.PORT || 4200;

ServerConfiguration.mongoDB();

app.use(router);

app.listen(port, () => {
  console.log("server start on port " + port);
});
