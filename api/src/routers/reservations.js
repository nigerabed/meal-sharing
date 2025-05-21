import express from "express";
import { StatusCodes } from "http-status-codes";
import knexInstance from "../database_client.js";

export const reservationRouter = express.Router();

const domain = "reservations";
const table_reservation = "Reservation";

reservationRouter.get(`/${domain}`, async(req,res) => {
  const reservations = await knexInstance.select().from(table_reservation)
    res.status(StatusCodes.OK).json(reservations)
});