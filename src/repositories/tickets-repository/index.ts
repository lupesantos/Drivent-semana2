import { prisma } from "@/config";
import { Ticket, TicketLess } from "@prisma/client";

async function getTicket(userId: number) {
  const ticket = prisma.ticket.findMany({
    where: {
      Enrollment: {
        userId: userId,
      },
    },
    include: {
      TicketType: true,
    },
  });

  return ticket;
}

async function getTicketById(ticketId: number) {
  const ticket = prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
  });

  return ticket;
}

async function getUserIdByEnrollmentId(enrollmentId: number) {
  const userIdByEnrollmentId = prisma.enrollment.findFirst({
    where: {
      id: enrollmentId,
    },
  });

  return userIdByEnrollmentId;
}

async function getTicketTypeById(ticketTypeId: number) {
  const ticketType = prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId,
    },
  });
  return ticketType;
}

async function getPaymentByTicketId(ticketId: number) {
  const paymentData = prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
  });

  return paymentData;
}

async function getTicketType() {
  const ticketType = prisma.ticketType.findMany();

  return ticketType;
}

async function postTicket(ticket: TicketLess): Promise<Ticket> {
  const fullTicket = prisma.ticket.create({
    data: ticket,
    include: {
      TicketType: true,
    },
  });

  return fullTicket;
}

const ticketsRepository = {
  getTicketTypeById,
  getPaymentByTicketId,
  getUserIdByEnrollmentId,
  getTicket,
  getTicketType,
  postTicket,
  getTicketById,
};

export default ticketsRepository;
