"use client";

import Alert, { type AlertProps } from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

interface CollapsableAlertProps {
  severity: AlertProps["severity"];
  collapse: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function CollapsableAlert({
  severity,
  children,
  collapse,
  onClose,
}: Readonly<CollapsableAlertProps>) {
  return (
    <Collapse in={collapse}>
      <Alert severity={severity} sx={{ mb: 2 }} onClose={onClose}>
        {children}
      </Alert>
    </Collapse>
  );
}
