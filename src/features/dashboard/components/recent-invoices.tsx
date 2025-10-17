import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Fragment } from "react";
import type { DashboardStats } from "@/features/dashboard/types/dashboard-stats";
import { formatCurrency, getStatusColor } from "@/utils";
import { StatusIcon } from "./status-icon";

export default function RecentInvoices({
  stats,
}: Readonly<{ stats: DashboardStats }>) {
  return (
    <Grid size={{ xs: 12 }}>
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">Recent Invoices</Typography>
            <Typography
              component={Link}
              href="/invoices"
              variant="body2"
              color="primary"
              sx={{ cursor: "pointer", textDecoration: "none" }}
            >
              View All →
            </Typography>
          </Box>

          {stats.recentInvoices.length > 0 ? (
            <List>
              {stats.recentInvoices.map((invoice, index) => (
                <Fragment key={invoice.id}>
                  <ListItem>
                    <ListItemIcon>
                      <StatusIcon status={invoice.status} />
                    </ListItemIcon>
                    <ListItemText
                      primary={invoice.title}
                      secondary={`${invoice.customer} • ${formatCurrency(invoice.amount)}`}
                    />
                    <Chip
                      label={invoice.status}
                      color={getStatusColor(invoice.status)}
                      size="small"
                    />
                  </ListItem>
                  {index < stats.recentInvoices.length - 1 && <Divider />}
                </Fragment>
              ))}
            </List>
          ) : (
            <Typography color="textSecondary" align="center" sx={{ py: 4 }}>
              No invoices found
            </Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}
