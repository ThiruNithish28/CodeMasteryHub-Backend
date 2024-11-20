import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { router } from "./routes/routes.js";
import { initialize } from "./config/database.js";

dotenv.config();
//initialize DB connection
await initialize();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.get("/hello", (req, res) => {
  res.send("backend is working fine");
});
app.use("/api", router);
app.listen(3000, () => {
  console.log("connected to the port 3000....");
});
