import type { InvoiceStatus } from "@/features/invoices/types/invoice-status";

export interface InvoiceInput {
  title: string;
  customer: string;
  amount: number;
  status: InvoiceStatus;
}
