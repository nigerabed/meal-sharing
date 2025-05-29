import express from "express";
import { StatusCodes } from "http-status-codes";
import knexInstance from "../database_client.js";

export const reviewRouter = express.Router();

const domain = "reviews";
const table_review = "Review";

reviewRouter.get(`/${domain}`, async (req, res) => {
  const reviews = await knexInstance.select().from(table_review);
  res.status(StatusCodes.OK).json(reviews);
});

reviewRouter.get(`/${domain}/:id`, async (req, res) => {
  const review_by_id = await knexInstance
    .select()
    .from(table_review)
    .where("id", req.params.id);
  res.status(StatusCodes.OK).json(review_by_id);
});

reviewRouter.post(`/${domain}`, async (req, res) => {
  console.log(req.body);
  const new_review = await knexInstance.insert(req.body).into(table_review);
  res.status(StatusCodes.CREATED).send({ new_review });
});


reviewRouter.delete(`/${domain}/:id`, async(req,res) => {
    const delete_review_by_id = await knexInstance.del().from(table_review).where('id', req.params.id)
    if(delete_review_by_id == 1){
      res.status(200).send("Successfully deleted.")
    }else{
      res.status(400).send("unable to delete")
    }
     
  });

  reviewRouter.put(`/${domain}/:id`, async(req,res) => {
    const update_review = await knexInstance
    .update( req.body )
    .from(table_review).where('id', req.params.id);
    if(update_review == 1){
      res.status(200).send("Successfully updated.")
    }else{
      res.status(400).send("unable to update")
    }
     
  });