"use client";

import Alert from "@mui/material/Alert";
import { useParams, useRouter } from "next/navigation";
import Spinner from "@/components/spinner";
import InvoiceForm from "@/features/invoices/components/invoice-form";
import { useGetInvoiceQuery } from "@/features/invoices/invoice-service";

export default function EditInvoicePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const {
    data: invoice,
    isLoading,
    isError,
  } = useGetInvoiceQuery(id, { refetchOnMountOrArgChange: false });

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
      onSave={() => router.push(`/invoices/${id}`)}
      onCancel={() => router.back()}
    />
  );
}
