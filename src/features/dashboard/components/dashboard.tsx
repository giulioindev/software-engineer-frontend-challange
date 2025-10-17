"use client";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SendIcon from "@mui/icons-material/Send";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Fragment } from "react";
import StatusIcon from "@/features/dashboard/components/status-icon";
import { useStats } from "@/features/dashboard/hooks/use-stats";
import { formatCurrency, getStatusColor } from "@/features/dashboard/utils";

export default function Dashboard() {
  const { stats, isLoading, isError } = useStats();

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" onClose={() => {}}>
        {"Failed to load dashboard data"}
      </Alert>
    );
  }

  if (!stats) {
    return null;
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
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Invoice Management Insights
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Key Metrics Cards */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Total Invoices
                  </Typography>
                  <Typography variant="h4">{stats.totalInvoices}</Typography>
                </Box>
                <ReceiptIcon color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Total Revenue
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {formatCurrency(stats.totalRevenue)}
                  </Typography>
                </Box>
                <AttachMoneyIcon color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Paid Invoices
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {stats.paidInvoices}
                  </Typography>
                </Box>
                <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Pending Invoices
                  </Typography>
                  <Typography variant="h4" color="warning.main">
                    {stats.pendingInvoices}
                  </Typography>
                </Box>
                <SendIcon color="warning" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Status Distribution */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Invoice Status Distribution
              </Typography>
              <Box display="flex" flexDirection="column" gap={2} mt={2}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckCircleIcon color="success" />
                    <Typography>Paid</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h6">{stats.paidInvoices}</Typography>
                    <Chip
                      label={`${Math.round((stats.paidInvoices / stats.totalInvoices) * 100)}%`}
                      color="success"
                      size="small"
                    />
                  </Box>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <SendIcon color="warning" />
                    <Typography>Sent</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h6">
                      {stats.pendingInvoices}
                    </Typography>
                    <Chip
                      label={`${Math.round((stats.pendingInvoices / stats.totalInvoices) * 100)}%`}
                      color="warning"
                      size="small"
                    />
                  </Box>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <EditIcon color="primary" />
                    <Typography>Draft</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="h6">{stats.draftInvoices}</Typography>
                    <Chip
                      label={`${Math.round((stats.draftInvoices / stats.totalInvoices) * 100)}%`}
                      color="primary"
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Financial Summary */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Financial Summary
              </Typography>
              <Box display="flex" flexDirection="column" gap={2} mt={2}>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Total Revenue:</Typography>
                  <Typography variant="h6" color="success.main">
                    {formatCurrency(stats.totalRevenue)}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography>Average Invoice Value:</Typography>
                  <Typography variant="h6">
                    {formatCurrency(stats.averageInvoiceValue)}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography>Paid vs Total:</Typography>
                  <Typography variant="h6">
                    {stats.paidInvoices} / {stats.totalInvoices}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Invoices */}
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
      </Grid>
    </Box>
  );
}
