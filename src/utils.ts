import type { InvoiceStatus } from "@/features/invoices/types/invoice-status";

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const getStatusColor = (status: InvoiceStatus) => {
  switch (status) {
    case "paid":
      return "success";
    case "sent":
      return "warning";
    case "draft":
      return "primary";
    default:
      return "primary";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

export { formatCurrency, getStatusColor, formatDate };
