import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import ticketsService from "@/services/tickets-service";
import paymentService from "@/services/payments-service";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId } = req.query;

  if (!ticketId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const ticket = await ticketsService.getTicketById2(Number(ticketId));
    const userIdByEnrollmentId = await ticketsService.getUserIdByEnrollmentId2(ticket.enrollmentId);

    if (userId !== userIdByEnrollmentId.userId) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    const payment = await ticketsService.getPaymentByTicketId2(Number(ticketId));

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId, cardData } = req.body;

  try {
    const ticket = await ticketsService.getTicketById2(ticketId);
    const userIdByEnrollmentId = await ticketsService.getUserIdByEnrollmentId2(ticket.enrollmentId);

    if (userId !== userIdByEnrollmentId.userId) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    const ticketType = await ticketsService.getTicketTypeById2(ticket.ticketTypeId);
    const cardLastDigits = last4(cardData.number);

    const Payment = {
      ticketId: ticketId,
      value: ticketType.price,
      cardIssuer: cardData.issuer,
      cardLastDigits: cardLastDigits,
    };

    const fullPayment = await paymentService.postPayments(Payment);
    await paymentService.updateStatus2(ticketId);

    return res.status(httpStatus.OK).send(fullPayment);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

function last4(number: number) {
  const numString = String(number);
  const last4Str = numString.slice(-4);

  return last4Str;
}
