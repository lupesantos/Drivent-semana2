import { prisma } from "@/config";
import { Payment, PaymentLess } from "@prisma/client";
import { TicketStatus } from "@prisma/client";

async function postPayment(payment: PaymentLess): Promise<Payment> {
  const fullPayment = prisma.payment.create({
    data: payment,
  });

  return fullPayment;
}

async function updateStatus(ticketId: number) {
  return await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

const paymentRepository = {
  postPayment,
  updateStatus,
};

export default paymentRepository;
