import { useEffect, useState } from "react";
import type { DashboardStats } from "@/features/dashboard/types/dashboard-stats";
import { useGetInvoicesQuery } from "@/features/invoices/invoice-service";
import type { Invoice } from "@/features/invoices/types/invoice";

export const useStats = () => {
  const {
    data: invoices,
    isLoading,
    isError,
    error,
  } = useGetInvoicesQuery({ page: 1 });
  const [stats, setStats] = useState<DashboardStats>({
    totalInvoices: 0,
    totalRevenue: 0,
    paidInvoices: 0,
    pendingInvoices: 0,
    draftInvoices: 0,
    averageInvoiceValue: 0,
    recentInvoices: [],
  });

  useEffect(() => {
    if (invoices) {
      const totalInvoices = invoices.items.length;
      const totalRevenue = invoices.items
        .filter((invoice) => invoice.status === "paid")
        .reduce((sum: number, invoice: Invoice) => sum + invoice.amount, 0);

      const paidInvoices = invoices.items.filter(
        (invoice) => invoice.status === "paid",
      ).length;

      const averageInvoiceValue =
        totalInvoices > 0 ? totalRevenue / paidInvoices : 0;

      const sortedInvoices = [...invoices.items].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      const recentInvoices = sortedInvoices.slice(0, 5);
      setStats({
        totalInvoices: invoices.items.length,
        totalRevenue: invoices.items.reduce(
          (sum: number, invoice: Invoice) => sum + invoice.amount,
          0,
        ),
        paidInvoices: paidInvoices,
        pendingInvoices: invoices.items.filter(
          (invoice) => invoice.status === "sent",
        ).length,
        draftInvoices: invoices.items.filter(
          (invoice) => invoice.status === "draft",
        ).length,
        averageInvoiceValue: averageInvoiceValue,
        recentInvoices: recentInvoices,
      });
    }
  }, [invoices]);

  return {
    stats,
    isLoading,
    isError,
    error,
  };
};
