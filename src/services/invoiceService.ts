import type {
  CreateInvoiceData,
  Invoice,
  InvoiceFilters,
  PaginationParams,
  UpdateInvoiceData,
} from "@/features/invoices/types/invoice";

// Mock data for development
const mockInvoices: Invoice[] = [
  {
    id: "1",
    title: "Website Development",
    amount: 2500.0,
    customer: "Acme Corp",
    date: "2024-01-15",
    status: "paid",
  },
  {
    id: "2",
    title: "Logo Design",
    amount: 500.0,
    customer: "TechStart Inc",
    date: "2024-01-20",
    status: "sent",
  },
  {
    id: "3",
    title: "Consulting Services",
    amount: 1200.0,
    customer: "Global Solutions",
    date: "2024-01-25",
    status: "draft",
  },
  {
    id: "4",
    title: "Mobile App Development",
    amount: 5000.0,
    customer: "Innovation Labs",
    date: "2024-02-01",
    status: "paid",
  },
  {
    id: "5",
    title: "UI/UX Design",
    amount: 800.0,
    customer: "Creative Agency",
    date: "2024-02-05",
    status: "draft",
  },
];

class InvoiceService {
  private invoices: Invoice[] = [...mockInvoices];

  async getInvoices(
    filters: InvoiceFilters = {},
    pagination: PaginationParams = { page: 1, limit: 10 },
  ): Promise<{ invoices: Invoice[]; total: number }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredInvoices = [...this.invoices];

    // Apply status filter
    if (filters.status) {
      filteredInvoices = filteredInvoices.filter(
        (invoice) => invoice.status === filters.status,
      );
    }

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredInvoices = filteredInvoices.filter(
        (invoice) =>
          invoice.title.toLowerCase().includes(searchTerm) ||
          invoice.customer.toLowerCase().includes(searchTerm),
      );
    }

    // Apply pagination
    const startIndex = (pagination.page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    const paginatedInvoices = filteredInvoices.slice(startIndex, endIndex);

    return {
      invoices: paginatedInvoices,
      total: filteredInvoices.length,
    };
  }

  async getInvoiceById(id: string): Promise<Invoice | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return this.invoices.find((invoice) => invoice.id === id) || null;
  }

  async createInvoice(data: CreateInvoiceData): Promise<Invoice> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newInvoice: Invoice = {
      id: Date.now().toString(),
      ...data,
      date: new Date().toISOString().split("T")[0],
      status: "draft",
    };

    this.invoices.unshift(newInvoice);
    return newInvoice;
  }

  async updateInvoice(
    id: string,
    data: UpdateInvoiceData,
  ): Promise<Invoice | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const index = this.invoices.findIndex((invoice) => invoice.id === id);
    if (index === -1) return null;

    this.invoices[index] = { ...this.invoices[index], ...data };
    return this.invoices[index];
  }

  async deleteInvoice(id: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const index = this.invoices.findIndex((invoice) => invoice.id === id);
    if (index === -1) return false;

    this.invoices.splice(index, 1);
    return true;
  }
}

export const invoiceService = new InvoiceService();
