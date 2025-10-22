import type { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import {
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
} from "@/features/invoices/invoice-service";
import type { Invoice } from "@/features/invoices/types/invoice";
import type { InvoiceInput } from "@/features/invoices/types/invoice-input";
import type { InvoiceStatus } from "@/features/invoices/types/invoice-status";

interface UseInvoiceFormProps {
  invoice?: Invoice;
}

export const useInvoiceForm = ({ invoice }: UseInvoiceFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    customer: "",
    status: "draft" as InvoiceStatus,
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [
    updateInvoice,
    {
      isLoading: isUpdating,
      isError: isUpdateError,
      error: updateError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateInvoiceMutation();
  const [
    createInvoice,
    {
      isLoading: isCreating,
      isError: isCreateError,
      error: createError,
      isSuccess: isCreateSuccess,
    },
  ] = useCreateInvoiceMutation();

  useEffect(() => {
    if (invoice) {
      setFormData({
        title: invoice.title,
        amount: invoice.amount.toString(),
        customer: invoice.customer,
        status: invoice.status,
      });
    }
    if (isUpdateError || isCreateError) {
      console.error(
        "Error saving invoice:",
        isUpdateError ? updateError : createError,
      );
      setSubmitError("Failed to save invoice");
    }
  }, [invoice, isUpdateError, isCreateError, updateError, createError]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.customer.trim()) {
      newErrors.customer = "Customer name is required";
    }
    if (formData.amount.trim() === "") {
      newErrors.amount = "Amount is required";
    } else {
      const amount = Number.parseFloat(formData.amount);
      if (Number.isNaN(amount) || amount <= 0) {
        newErrors.amount = "Amount must be a positive number";
      }
    }
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setSubmitError(null);
    const submitData: InvoiceInput = {
      title: formData.title.trim(),
      customer: formData.customer.trim(),
      amount: Number.parseFloat(formData.amount),
      status: formData.status,
    };
    if (invoice) {
      updateInvoice({
        // NOTE: this is to workaround Mockoon wrong behavior
        // since the id is not returned as empty string
        id: "1",
        data: submitData,
      });
    } else {
      createInvoice(submitData);
    }
  };

  const handleInputChange =
    (field: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent,
    ) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (validationErrors[field]) {
        setValidationErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

  return {
    formData,
    validationErrors,
    isSubmitting: isUpdating || isCreating,
    isSuccess: isUpdateSuccess || isCreateSuccess,
    submitError,
    handleSubmit,
    handleInputChange,
    setSubmitError,
  };
};
