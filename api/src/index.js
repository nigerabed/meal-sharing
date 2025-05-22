import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import {mealsRouter} from "./routers/meals.js";
import { reservationRouter } from "./routers/reservations.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();

app.get("/", async (req, res) => {
  res.send("Welcome to Meal sharing...");
});


app.use(mealsRouter);
app.use(reservationRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
