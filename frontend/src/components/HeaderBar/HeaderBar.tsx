import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  IconButton, 
  TextField, 
  Snackbar, 
  Alert,
  Dialog
} from "@mui/material";
import { Search, ShoppingBag } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface HeaderBarProps {
  isLoggedIn: boolean;
}

const HeaderBar = ({ isLoggedIn }: HeaderBarProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setShowSearch((prev) => !prev);
  };

  const handleShoppingClick = () => {
    if (isLoggedIn) {
      navigate("/produtos"); // página de produtos/serviços
    } else {
      setOpenAlert(true); // abre aviso
      setTimeout(() => {
        navigate("/inicio/login");
      }, 5000);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/buscar?query=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 5,
          pt: 2,
          color: "#5f3d41",
        }}
      >
        {/* Esquerda */}
        <Box display="flex" gap={1}>
          <Typography fontSize="0.9rem">info@EstudioBela.com</Typography>
        </Box>

        {/* Direita */}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography fontSize="0.9rem">
            Av. Paulista, 1002 - Bela Vista
          </Typography>

          {/* Campo de busca visível apenas se showSearch = true */}
          {showSearch && (
            <form onSubmit={handleSearchSubmit}>
              <TextField
                size="small"
                placeholder="Buscar..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
            </form>
          )}

          {/* Botão de busca */}
          <IconButton onClick={handleSearchToggle} sx={{ color: "#5f3d41" }}>
            <Search />
          </IconButton>

          {/* Botão do carrinho */}
          <IconButton onClick={handleShoppingClick} sx={{ color: "#5f3d41" }}>
            <ShoppingBag />
          </IconButton>
        </Box>
      </Box>

      {/* Snackbar de aviso */}
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert 
          onClose={() => setOpenAlert(false)} 
          severity="warning" 
          sx={{ width: "100%" }}
        >
          Você precisa estar logado para acessar os produtos e serviços.
        </Alert>
      </Snackbar>
    </>
  );
};

export default HeaderBar;
