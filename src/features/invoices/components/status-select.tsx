import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import type { InvoiceStatus } from "@/features/invoices/types/invoice-status";

interface StatusSelectProps {
  value: InvoiceStatus | "";
  onChange: (value: InvoiceStatus | "") => void;
}

export default function StatusSelect({
  value,
  onChange,
}: Readonly<StatusSelectProps>) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={value}
              label="Status"
              onChange={(e) => onChange(e.target.value as InvoiceStatus | "")}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="sent">Sent</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </CardContent>
    </Card>
  );
}
