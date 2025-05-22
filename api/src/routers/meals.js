import express from "express";
import { StatusCodes } from "http-status-codes";
import knexInstance from "../database_client.js";

export const mealsRouter = express.Router();

const domain = "meals";
const table_meal = "Meal";

mealsRouter.get(`/${domain}`, async(req,res) => {
  const meals = await knexInstance.select().from(table_meal)
    res.status(StatusCodes.OK).json(meals)
});

mealsRouter.get(`/${domain}/:id`, async(req,res) => {
  const meals_by_id = await knexInstance.select().from(table_meal).where('id', req.params.id)
    res.status(StatusCodes.OK).json(meals_by_id)
});

mealsRouter.post(`/${domain}`, async(req, res) => {
    console.log(req.body);
    const save_meal = await knexInstance.insert(req.body).into(table_meal);
      res.status(StatusCodes.CREATED).send({save_meal})
      
  });

  mealsRouter.delete(`/${domain}/:id`, async(req,res) => {
  const delete_meals_by_id = await knexInstance.del().from(table_meal).where('id', req.params.id)
  if(delete_meals_by_id == 1){
    res.status(200).send("Successfully deleted.")
  }else{
    res.status(400).send("unable to delete")
  }
   
});
  mealsRouter.put(`/${domain}/:id`, async(req,res) => {
  const update_meals = await knexInstance
  .update( req.body )
  .from(table_meal).where('id', req.params.id);
  res.status(StatusCodes.OK).json(update_meals)
  if(update_meals == 1){
    res.status(200).send("Successfully updated.")
  }else{
    res.status(400).send("unable to update")
  }
   
});




