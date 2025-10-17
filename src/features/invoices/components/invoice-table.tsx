"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ViewIcon from "@mui/icons-material/Visibility";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Invoice } from "@/features/invoices/types/invoice";
import { sortInvoices } from "@/features/invoices/utils";
import type { PaginatedData } from "@/types/paginated-data";
import { formatCurrency, formatDate, getStatusColor } from "@/utils";

interface InvoiceTableProps {
  invoices: PaginatedData<Invoice>;
  handleDelete: (invoice: Invoice) => void;
}

export default function InvoiceTable({
  invoices,
  handleDelete,
}: Readonly<InvoiceTableProps>) {
  const router = useRouter();
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Invoice>("date");

  const handleSort = (property: keyof Invoice) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedInvoices = sortInvoices(invoices.items, orderBy, order);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "title"}
                direction={orderBy === "title" ? order : "asc"}
                onClick={() => handleSort("title")}
              >
                Title
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "customer"}
                direction={orderBy === "customer" ? order : "asc"}
                onClick={() => handleSort("customer")}
              >
                Customer
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "amount"}
                direction={orderBy === "amount" ? order : "asc"}
                onClick={() => handleSort("amount")}
              >
                Amount
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "date"}
                direction={orderBy === "date" ? order : "asc"}
                onClick={() => handleSort("date")}
              >
                Date
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "status"}
                direction={orderBy === "status" ? order : "asc"}
                onClick={() => handleSort("status")}
              >
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedInvoices.map((invoice) => (
            <TableRow key={invoice.id} hover>
              <TableCell>{invoice.title}</TableCell>
              <TableCell>{invoice.customer}</TableCell>
              <TableCell>{formatCurrency(invoice.amount)}</TableCell>
              <TableCell>{formatDate(invoice.date)}</TableCell>
              <TableCell>
                <Chip
                  label={invoice.status}
                  color={getStatusColor(invoice.status)}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  onClick={() => router.push(`/invoices/${invoice.id}`)}
                  title="View"
                >
                  <ViewIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => router.push(`/invoices/${invoice.id}/edit`)}
                  title="Edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(invoice)}
                  title="Delete"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
