import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "./database_client.js";
import {mealsRouter} from "./routers/meals.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();
// You can delete this route once you add your own routes
app.get("/", async (req, res) => {
  res.send("Welcome to Meal sharing...");
});

// app.get("/all-meals", async (req, res) => {
//   const SHOW_MEAL_QUERY = "SELECT * FROM `Meal` ORDER BY id;";
//   const [meals] = await knex.raw(SHOW_MEAL_QUERY);
//   res.json(meals);
// });
// app.get("/future-meals", async (req, res) => {
//   const SHOW_MEAL_QUERY = "SELECT * from Meal WHERE Meal.when > ? ;";
//   const [meals] = await knex.raw(SHOW_MEAL_QUERY, new Date());
//   res.json(meals);
// });
// app.get("/past-meals", async (req, res) => {
//   const SHOW_MEAL_QUERY = "SELECT * from Meal WHERE Meal.when < ?  ;";
//   const [meals] = await knex.raw(SHOW_MEAL_QUERY, new Date());
//   res.json(meals);
// });
// app.get("/first-meal", async (req, res) => {
//   const SHOW_MEAL_QUERY = "SELECT * from Meal ORDER BY `Meal`.id ASC limit 1;";
//   const [meals] = await knex.raw(SHOW_MEAL_QUERY);
//   res.json(meals);
// });
// app.get("/last-meal", async (req, res) => {
//   const SHOW_MEAL_QUERY = "SELECT * from Meal ORDER BY `Meal`.id desc limit 1;";
//   const [meals] = await knex.raw(SHOW_MEAL_QUERY);
//   res.json(meals);
// });

app.use(mealsRouter);

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
