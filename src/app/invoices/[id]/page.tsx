"use client";

import { Alert, Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import InvoiceDetails from "@/features/invoices/components/invoice-details";
import type { Invoice } from "@/features/invoices/types/invoice";
import { invoiceService } from "@/services/invoiceService";

interface InvoiceDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function InvoiceDetailsPage({
  params,
}: InvoiceDetailsPageProps) {
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = use(params);

  useEffect(() => {
    const loadInvoice = async () => {
      try {
        setLoading(true);
        const data = await invoiceService.getInvoiceById(id);
        setInvoice(data);
      } catch (err) {
        setError("Failed to load invoice");
        console.error("Error loading invoice:", err);
      } finally {
        setLoading(false);
      }
    };

    loadInvoice();
  }, [id]);

  const handleBack = () => {
    router.push("/invoices");
  };

  const handleEdit = (invoice: Invoice) => {
    router.push(`/invoices/${invoice.id}/edit`);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !invoice) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error || "Invoice not found"}
      </Alert>
    );
  }

  return (
    <InvoiceDetails invoice={invoice} onBack={handleBack} onEdit={handleEdit} />
  );
}
