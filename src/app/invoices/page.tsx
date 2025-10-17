"use client";

import AddIcon from "@mui/icons-material/Add";
import { Alert, Box, Button, Pagination, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useEffect, useState } from "react";
import CollapsableAlert from "@/components/collapsable-alert";
import Spinner from "@/components/spinner";
import DeleteDialog from "@/features/invoices/components/delete-dialog";
import InvoiceTable from "@/features/invoices/components/invoice-table";
import StatusSelect from "@/features/invoices/components/status-select";
import {
  useDeleteInvoiceMutation,
  useGetInvoicesQuery,
} from "@/features/invoices/invoice-service";
import type { Invoice, InvoiceStatus } from "@/features/invoices/types/invoice";
import type { InvoiceFilters } from "@/features/invoices/types/invoice-filters";
export default function InvoicesPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<InvoiceFilters>({ page });
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const {
    data: invoices,
    isLoading,
    isError,
    isSuccess,
  } = useGetInvoicesQuery(filters);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<Invoice | null>(null);
  const [
    deleteInvoice,
    {
      isLoading: isDeleting,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteInvoiceMutation();
  const handleStatusFilterChange = (status: InvoiceStatus | "") => {
    setFilters((currentFilters: InvoiceFilters) => ({
      ...currentFilters,
      status: status === "" ? undefined : status,
    }));
    setPage(0);
  };

  const handleDelete = (invoice: Invoice) => {
    setInvoiceToDelete(invoice);
    setDeleteDialogOpen(true);
  };

  const handleDialogDelete = () => {
    if (!invoiceToDelete) return;
    deleteInvoice(invoiceToDelete.id);
  };

  const handleDialogClose = () => {
    setInvoiceToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleChangePage = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
    setFilters((currentFilters: InvoiceFilters) => ({
      ...currentFilters,
      page: value,
    }));
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      setInvoiceToDelete(null);
      setDeleteDialogOpen(false);
      setDeleteAlertOpen(true);
    }
  }, [isDeleteSuccess]);

  const totalPages = invoices?.totalPages ?? 0;
  if (isLoading || isDeleting) {
    return <Spinner />;
  } else if (isError || isDeleteError) {
    return (
      <Alert severity="error" sx={{ mb: 2 }} onClose={() => {}}>
        {isError ? "Failed to load invoices" : "Failed to delete invoice"}
      </Alert>
    );
  } else if (isSuccess && !invoices) {
    return (
      <Alert severity="info" sx={{ mb: 2 }} onClose={() => {}}>
        {"No invoices found"}
      </Alert>
    );
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1">
          Invoices
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push("/invoices/new")}
        >
          New Invoice
        </Button>
      </Box>
      <CollapsableAlert
        severity="success"
        collapse={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
      >
        Invoice deleted successfully
      </CollapsableAlert>
      <StatusSelect
        value={filters.status || ""}
        onChange={handleStatusFilterChange}
      />
      {isSuccess && invoices && (
        <InvoiceTable invoices={invoices} handleDelete={handleDelete} />
      )}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      )}
      {invoiceToDelete && (
        <DeleteDialog
          open={deleteDialogOpen}
          invoiceToDelete={invoiceToDelete}
          onDelete={handleDialogDelete}
          onClose={handleDialogClose}
        />
      )}
    </Box>
  );
}
