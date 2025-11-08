import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
    Fade,
    Box,
  } from "@mui/material";
import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
  
  interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirmation: () => void;
    servico: string | undefined;
    profissional: string | undefined;
    data: string | undefined;
    horario: string;
  }
  
  const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    open,
    onClose,
    onConfirmation,
    servico,
    profissional,
    data,
    horario,
  }) => {
    const [confirmed, setConfirmed] = useState<null | "success" | "cancel">(null);
    
    const handleConfirm = () => {
        // onConfirmation();
        setConfirmed("success");
      };
    
      const handleCancel = () => {
        setConfirmed("cancel");
      };
    
      const handleClose = () => {
        setConfirmed(null);
        onClose();
      };

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle 
            sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: { xs: "1rem", md: "1.4rem" },
            }}
        >
            Confirmação de Agendamento
        </DialogTitle>
        <DialogContent>
            {confirmed === "success" && (
                <>
                    <Typography
                        sx={{
                        textAlign: 'center',
                        fontSize: { xs: "0.8rem", md: "1rem" },
                        }}
                    >
                        Agendamento realizado com sucesso.
                    </Typography>
                    <Fade in={true} timeout={500}>
                        <Box display="flex" justifyContent="center" mt={1}>
                            <CheckCircleIcon color="success" sx={{ fontSize: 60 }} />
                        </Box>
                    </Fade>
                </>
            )}
            {confirmed === "cancel" && (
                <>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            fontSize: { xs: "0.8rem", md: "1rem" },
                            }}
                    >
                        Agendamento cancelado.
                    </Typography>
                    <Fade in={true} timeout={500}>
                        <Box display="flex" justifyContent="center" mt={1}>
                            <CancelIcon color="error" sx={{ fontSize: 60 }} />
                        </Box>
                    </Fade>
                </>
            )}
            {confirmed === null && (
            <>
                <Typography>Serviço: {servico}</Typography>
                <Typography>Profissional: {profissional}</Typography>
                <Typography>Data: {data}</Typography>
                <Typography>Horário: {horario}</Typography>
            </>
            )}
        </DialogContent>
        <DialogActions>
            {confirmed === null ? (
            <>
                <Button onClick={handleCancel}>Cancelar</Button>
                <Button variant="contained" color="primary" onClick={handleConfirm}>
                    Confirmar
                </Button>
            </>
            ) : (
            <Button onClick={handleClose}>Fechar</Button>
            )}
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ConfirmationModal;
  