import express from "express";
import { StatusCodes } from "http-status-codes";
import knexInstance from "../database_client.js";

export const mealsRouter = express.Router();

const domain = "meals";
const table_meal = "Meal";

mealsRouter.get(`/${domain}`, async (req, res) => {
  let query = knexInstance.select().from(table_meal);

  if ("maxPrice" in req.query) {
    const sortby_maxPrice = req.query.maxPrice.toString();
    if (sortby_maxPrice.length > 0) {
      query.where("price", "<=", sortby_maxPrice);
    }
  } else if ("availableReservations" in req.query) {
    const sortby_availableReservations =
      req.query.availableReservations.toString();
    if (sortby_availableReservations) {
      query = knexInstance(table_meal)
        .leftJoin("Reservation", "Meal.id", "Reservation.meal_id")
        .select(
          knexInstance.raw(
            "IFNULL(SUM(`Reservation`.`number_of_guests`), 0) AS `number_of_guests`"
          ),
          "Meal.max_reservations",
          "Meal.id as meal_id",
          "Meal.title"
        )
        .groupBy("Meal.id")
        .havingRaw("number_of_guests < `Meal`.`max_reservations`");
    }
  } else if ("title" in req.query) {
    const sortby_title = req.query.title.toString();
    if (sortby_title) {
      query.whereRaw("title LIKE ?", ["%" + sortby_title + "%"]);
    }
  } else if ("dateAfter" in req.query) {
    const sortby_dateAfter = req.query.dateAfter.toString();
    if (sortby_dateAfter) {
      query.where("when", ">", sortby_dateAfter);
    }
  } else if ("dateBefore" in req.query) {
    const sortby_dateBefore = req.query.dateBefore.toString();
    if (sortby_dateBefore) {
      query.where("when", "<", sortby_dateBefore);
    }
  }
  else if ("limit" in req.query) {
    const sortby_limit = req.query.limit.toString();
    if (sortby_limit) {
      query.limit(sortby_limit);
    }
  }
  
  else if ("sortKey" in req.query && "sortDir" in req.query) {
    const sortKey = req.query.sortKey.toString();
    const sortDir = req.query.sortDir.toString();
    if (sortKey && sortDir) {
      query.orderBy(sortKey,sortDir);
    }
  }
  else if ("sortKey" in req.query) {
    const sortKey = req.query.sortKey.toString();
    if (sortKey) {
      query.orderBy(sortKey);
    }
  }

  console.log("SQL", query.toSQL().sql);

  try {
    const data = await query;
    res.json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

mealsRouter.get(`/${domain}/:id`, async (req, res) => {
  const meals_by_id = await knexInstance
    .select()
    .from(table_meal)
    .where("id", req.params.id);
  res.status(StatusCodes.OK).json(meals_by_id);
});

mealsRouter.post(`/${domain}`, async (req, res) => {
  console.log(req.body);
  const save_meal = await knexInstance.insert(req.body).into(table_meal);
  res.status(StatusCodes.CREATED).send({ save_meal });
});

mealsRouter.delete(`/${domain}/:id`, async (req, res) => {
  const delete_meals_by_id = await knexInstance
    .del()
    .from(table_meal)
    .where("id", req.params.id);
  if (delete_meals_by_id == 1) {
    res.status(200).send("Successfully deleted.");
  } else {
    res.status(400).send("unable to delete");
  }
});
mealsRouter.put(`/${domain}/:id`, async (req, res) => {
  const update_meals = await knexInstance
    .update(req.body)
    .from(table_meal)
    .where("id", req.params.id);
  res.status(StatusCodes.OK).json(update_meals);
  if (update_meals == 1) {
    res.status(200).send("Successfully updated.");
  } else {
    res.status(400).send("unable to update");
  }
});
