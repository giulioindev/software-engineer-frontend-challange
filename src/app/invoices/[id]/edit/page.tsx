"use client";

import { Alert, Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import InvoiceForm from "@/features/invoices/components/invoice-form";
import type {
  Invoice,
  UpdateInvoiceData,
} from "@/features/invoices/types/invoice";
import { invoiceService } from "@/services/invoiceService";

interface EditInvoicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditInvoicePage({ params }: EditInvoicePageProps) {
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const handleSave = async (data: UpdateInvoiceData) => {
    try {
      setSaving(true);
      await invoiceService.updateInvoice(id, data);
      router.push(`/invoices/${id}`);
    } catch (error) {
      console.error("Error updating invoice:", error);
      throw error; // Let the form handle the error display
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/invoices/${id}`);
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
    <InvoiceForm
      invoice={invoice}
      onSave={handleSave}
      onCancel={handleCancel}
      loading={saving}
    />
  );
}
