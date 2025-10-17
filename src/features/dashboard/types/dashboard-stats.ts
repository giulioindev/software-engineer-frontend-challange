import type { Invoice } from "@/features/invoices/types/invoice";

interface DashboardStats {
  totalInvoices: number;
  totalRevenue: number;
  paidInvoices: number;
  pendingInvoices: number;
  draftInvoices: number;
  averageInvoiceValue: number;
  recentInvoices: Invoice[];
}

export type { DashboardStats };
