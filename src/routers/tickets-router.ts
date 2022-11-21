import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketsTypes, getTicketsByUserId, postTicket } from "@/controllers/tickets-controller";
import { createTicketSchema } from "@/schemas/tickets-schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketsTypes)
  .get("/", getTicketsByUserId)
  .post("/", validateBody(createTicketSchema), postTicket);

export { ticketsRouter };
