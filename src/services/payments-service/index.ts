import { PaymentLess } from "@prisma/client";
import paymentRepository from "@/repositories/payment-repository/index";

async function postPayments(fullPayment: PaymentLess) {
  const fullPayment2 = await paymentRepository.postPayment(fullPayment);

  return fullPayment2;
}

async function updateStatus2(ticketId: number) {
  return await paymentRepository.updateStatus(ticketId);
}
const paymentService = { postPayments, updateStatus2 };

export default paymentService;
