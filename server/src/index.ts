import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import { Database } from "./configs/db.config";
import { routes } from "./routes";
import { EnvVariablesVerifier } from "./configs/env.config";

const verifier = new EnvVariablesVerifier([
  "DB_HOST",
  "DB_USER",
  "DB_PORT",
  "DB_PASS",
  "DB_NAME",
  "PORT",
  "WEATHER_API_KEY",
]);
verifier.verify();
const app = express();
const db = Database.getInstance();

app.use(helmet());
app.use(express.json());

routes(app);

db.authenticate()
  .then(() => {
    console.log("Connected to database.");
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}.`);
    });
  })
  .catch((err: any) => {
    console.error("Unable to connect to the database:", err);
  });
