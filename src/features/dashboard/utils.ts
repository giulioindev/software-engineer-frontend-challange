import type { InvoiceStatus } from "../invoices/types/invoice-status";

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

export { formatCurrency, getStatusColor };
