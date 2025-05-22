import express from "express";
import { StatusCodes } from "http-status-codes";
import knexInstance from "../database_client.js";

export const reservationRouter = express.Router();

const domain = "reservations";
const table_reservation = "Reservation";

reservationRouter.get(`/${domain}`, async (req, res) => {
  const reservations = await knexInstance.select().from(table_reservation);
  res.status(StatusCodes.OK).json(reservations);
});

reservationRouter.get(`/${domain}/:id`, async (req, res) => {
  const reservations_by_id = await knexInstance
    .select()
    .from(table_reservation)
    .where("id", req.params.id);
  res.status(StatusCodes.OK).json(reservations_by_id);
});

reservationRouter.post(`/${domain}`, async (req, res) => {
  console.log(req.body);
  const new_reservation = await knexInstance.insert(req.body).into(table_reservation);
  res.status(StatusCodes.CREATED).send({ new_reservation });
});


reservationRouter.delete(`/${domain}/:id`, async(req,res) => {
    const delete_reservation_by_id = await knexInstance.del().from(table_reservation).where('id', req.params.id)
    if(delete_reservation_by_id == 1){
      res.status(200).send("Successfully deleted.")
    }else{
      res.status(400).send("unable to delete")
    }
     
  });

  reservationRouter.put(`/${domain}/:id`, async(req,res) => {
    const update_reservation = await knexInstance
    .update( req.body )
    .from(table_reservation).where('id', req.params.id);
    if(update_reservation == 1){
      res.status(200).send("Successfully updated.")
    }else{
      res.status(400).send("unable to update")
    }
     
  });