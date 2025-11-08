import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
  } from "@mui/material";
  import React from "react";
  
  interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    message: string;
  }
  
  const ConfirmationMessage: React.FC<ConfirmationModalProps> = ({
    open,
    onClose,
    title,
    message,
  }) => {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ConfirmationMessage;
  