import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import type { Invoice } from "@/features/invoices/types/invoice";

interface DeleteDialogProps {
  open: boolean;
  invoiceToDelete: Invoice;
  onDelete: (invoice: Invoice) => void;
  onClose: () => void;
}

export default function DeleteDialog({
  open,
  invoiceToDelete,
  onDelete,
  onClose,
}: Readonly<DeleteDialogProps>) {
  const handleDelete = () => {
    onDelete(invoiceToDelete);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Invoice</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the invoice "{invoiceToDelete?.title}
          "? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
