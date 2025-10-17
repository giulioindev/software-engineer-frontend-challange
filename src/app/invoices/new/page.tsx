"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import InvoiceForm from "@/features/invoices/components/invoice-form";
import type { CreateInvoiceData } from "@/features/invoices/types/invoice";
import { invoiceService } from "@/services/invoiceService";

export default function NewInvoicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSave = async (data: CreateInvoiceData) => {
    try {
      setLoading(true);
      await invoiceService.createInvoice(data);
      router.push("/invoices");
    } catch (error) {
      console.error("Error creating invoice:", error);
      throw error; // Let the form handle the error display
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/invoices");
  };

  return (
    <InvoiceForm
      onSave={handleSave}
      onCancel={handleCancel}
      loading={loading}
    />
  );
}
