import type { InvoiceStatus } from "@/features/invoices/types/invoice-status";

export interface InvoiceFilters {
  status?: InvoiceStatus;
  page?: number;
}
