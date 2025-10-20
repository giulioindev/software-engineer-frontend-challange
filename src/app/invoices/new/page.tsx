"use client";

import { useRouter } from "next/navigation";
import InvoiceForm from "@/features/invoices/components/invoice-form";
import { useCreateInvoiceMutation } from "@/features/invoices/invoice-service";
import type { InvoiceInput } from "@/features/invoices/types/invoice-input";

export default function NewInvoicePage() {
  const router = useRouter();
  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();

  const handleSave = async (data: InvoiceInput) => {
    try {
      await createInvoice(data).unwrap();
      router.push("/invoices");
    } catch (error) {
      console.error("Error creating invoice:", error);
      throw error; // Let the form handle the error display
    }
  };

  const handleCancel = () => {
    router.push("/invoices");
  };

  return (
    <InvoiceForm
      onSave={handleSave}
      onCancel={handleCancel}
      loading={isLoading}
    />
  );
}
