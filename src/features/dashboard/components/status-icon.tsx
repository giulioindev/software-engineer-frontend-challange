import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SendIcon from "@mui/icons-material/Send";
import type { InvoiceStatus } from "@/features/invoices/types/invoice-status";

export const StatusIcon = ({ status }: { status: InvoiceStatus }) => {
  switch (status) {
    case "paid":
      return <CheckCircleIcon />;
    case "sent":
      return <SendIcon />;
    case "draft":
      return <EditIcon />;
    default:
      return <ReceiptIcon />;
  }
};

export default StatusIcon;
