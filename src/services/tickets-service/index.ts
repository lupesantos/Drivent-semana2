import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/tickets-repository/index";
import { TicketLess } from "@prisma/client";

async function getTicketsByUserId2(userId: number) {
  const ticket = await ticketRepository.getTicket(userId);

  if (!ticket[0].id) {
    throw notFoundError();
  }

  return ticket;
}

async function getTicketById2(ticketId: number) {
  const ticket = await ticketRepository.getTicketById(ticketId);

  if (!ticket.id) {
    throw notFoundError();
  }

  return ticket;
}

async function getUserIdByEnrollmentId2(enrollmentId: number) {
  const userIdFromEnrollmentId = await ticketRepository.getUserIdByEnrollmentId(enrollmentId);

  return userIdFromEnrollmentId;
}

async function getTicketsTypes2() {
  const ticketType = await ticketRepository.getTicketType();

  return ticketType;
}

async function getPaymentByTicketId2(ticketId: number) {
  const paymentData = await ticketRepository.getPaymentByTicketId(ticketId);

  return paymentData;
}

async function getTicketTypeById2(ticketId: number) {
  const ticketType = await ticketRepository.getTicketTypeById(ticketId);

  return ticketType;
}

async function postTickets(fullTicket: TicketLess) {
  const fullTicket2 = await ticketRepository.postTicket(fullTicket);

  return fullTicket2;
}

const ticketsService = {
  getTicketTypeById2,
  getPaymentByTicketId2,
  getUserIdByEnrollmentId2,
  getTicketsByUserId2,
  getTicketsTypes2,
  postTickets,
  getTicketById2,
};

export default ticketsService;
