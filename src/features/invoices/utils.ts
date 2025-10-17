import type { Invoice } from "@/features/invoices/types/invoice";

const sortInvoices = (
  invoices: Invoice[],
  orderBy: keyof Invoice,
  order: "asc" | "desc",
) => {
  return [...invoices].sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (aValue === undefined || bValue === undefined) return 0;

    let comparison = 0;
    if (aValue < bValue) {
      comparison = -1;
    } else if (aValue > bValue) {
      comparison = 1;
    }

    return order === "asc" ? comparison : -comparison;
  });
};

export { sortInvoices };
