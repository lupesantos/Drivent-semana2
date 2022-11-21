import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";
import enrollmentsService from "@/services/enrollments-service";
import { TicketStatus } from "@prisma/client";

export async function getTicketsByUserId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);
    const ticket = await ticketsService.getTicketsByUserId2(userId);

    return res.status(httpStatus.OK).send(ticket[0]);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketType = await ticketsService.getTicketsTypes2();

    return res.status(httpStatus.OK).send(ticketType);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;

  try {
    const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);

    const ticketObj = {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentWithAddress.id,
      status: TicketStatus.RESERVED,
    };

    const fullTicket = await ticketsService.postTickets(ticketObj);

    return res.status(httpStatus.CREATED).send(fullTicket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
