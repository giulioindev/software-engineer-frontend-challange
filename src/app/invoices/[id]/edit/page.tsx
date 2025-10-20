"use client";

import Alert from "@mui/material/Alert";
import { useParams, useRouter } from "next/navigation";
import Spinner from "@/components/spinner";
import InvoiceForm from "@/features/invoices/components/invoice-form";
import {
  useGetInvoiceQuery,
  useUpdateInvoiceMutation,
} from "@/features/invoices/invoice-service";
import type { InvoiceInput } from "@/features/invoices/types/invoice-input";

export default function EditInvoicePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const {
    data: invoice,
    isLoading,
    isError,
  } = useGetInvoiceQuery(id, { refetchOnMountOrArgChange: false });
  const [updateInvoice, { isLoading: isSaving }] = useUpdateInvoiceMutation();

  const handleSave = async (data: InvoiceInput) => {
    try {
      await updateInvoice({
        id,
        data,
      }).unwrap();
      router.push(`/invoices/${id}`);
    } catch (error) {
      console.error("Error updating invoice:", error);
      throw error; // Let the form handle the error display
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !invoice) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {"Invoice not found"}
      </Alert>
    );
  }

  return (
    <InvoiceForm
      invoice={invoice}
      onSave={handleSave}
      onCancel={handleCancel}
      loading={isSaving}
    />
  );
}
