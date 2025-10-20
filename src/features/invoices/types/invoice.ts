import type { InvoiceInput } from "@/features/invoices/types/invoice-input";

export interface Invoice extends InvoiceInput {
  id: string;
  date: string;
}
