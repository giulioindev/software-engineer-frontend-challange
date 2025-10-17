export type InvoiceStatus = "draft" | "sent" | "paid";

export interface Invoice {
  id: string;
  title: string;
  amount: number;
  customer: string;
  date: string;
  status: InvoiceStatus;
}

export interface CreateInvoiceData {
  title: string;
  amount: number;
  customerName: string;
}

export interface UpdateInvoiceData {
  title?: string;
  amount?: number;
  customer?: string;
  status?: InvoiceStatus;
}

export interface InvoiceFilters {
  status?: InvoiceStatus;
  search?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
