import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import Logo from "../../assets/img/logo-m.png";
import { Box, Typography, IconButton, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, Search, ShoppingBag } from '@mui/icons-material';
import "./NavBar.css";
import HeaderBar from "../HeaderBar/HeaderBar";

const pages = ["Empresa", "Serviços", "Blog", "Contato"];

const NavBar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#fff",
      },
    },
  });

  const ButtonRegister = styled(Button)<ButtonProps>(() => ({
    color: "#5f3d41",
    background: 'transparent',
    border: "1.5px solid #5f3d41",    
    textTransform: "none",
    width: "140px",
    minWidth: "120px",
    maxWidth: "160px",
    borderRadius: "0px !important",
    fontSize: "1.1rem",
    "&:hover": {
      backgroundColor: 'rgb(146, 121, 124)',
      border: "1.5px solid rgb(146, 121, 124)",
      color: 'white'
    },
  }));
  
  const ButtonLogin = styled(Button)<ButtonProps>(() => ({
    backgroundColor: "#5f3d41",
    border: "1.5px solid #5f3d41",
    color: 'white',
    textTransform: "none",
    width: "140px", 
    minWidth: "120px",
    maxWidth: "160px",
    marginRight: "15px",
    borderRadius: "0px !important",
    fontSize: "1.1rem",
    "&:hover": {
      backgroundColor: 'rgb(146, 121, 124)',
      border: "1.5px solid rgb(146, 121, 124)",
      color: 'white'
    },
  }));

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLoginClick = () => {
    navigate("/inicio/login");
  };

  const handleRegisterClick = () => {
    navigate("/inicio/cadastro");
  };

  return (
    <Box>
      <Box>
        {/* <Box sx={{display: 'flex', justifyContent: "space-between", px: 5, pt: 2, color: "#5f3d41" }}> 
          <Box display="flex" gap={1} >
            <Typography fontSize="0.9rem">info@Espaco-Belaweb.com</Typography>
          </Box>
          <Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography fontSize="0.9rem">Av. Paulista, 1002 - Bela Vista</Typography>
            <Search />
            <ShoppingBag />
          </Box>
          </Box>
        </Box> */}
        {/* Criar logica para identificar se o usuario esta logado e passar como propriedade */}
        <HeaderBar isLoggedIn={false} /> 
        <Box
          sx={{
            background: 'transparent',
            display: "flex",
            justifyContent: "space-between" ,
            alignItems: "center",
            px: 4,
            mb: 2
          }}
        >
          <Box display="flex" gap={1} >
            <IconButton sx={{color: "inherit"}}><Facebook  fontSize="large" /></IconButton>
            <IconButton sx={{color: "inherit"}}><Twitter  fontSize="large" /></IconButton>
            <IconButton sx={{color: "inherit"}}><Instagram  fontSize="large" /></IconButton>
          </Box>
          {/* <img
            src={Logo}
            alt="Espaço Bela Logo"
            className="image-container-navbar"
          /> */}

          <Box 
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "#5f3d41",
                  display: "block",
                  underline: "hover",
                  textTransform: "none",
                  fontSize: { xs: "0.9rem", md: "1.3rem" },
                  "&:hover": {
                    backgroundColor: 'rgb(146, 121, 124)',
                    border: "1.5px solid rgb(146, 121, 124)",
                    color: 'white'
                  }
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mr: 2 }}>
              <ButtonLogin variant="outlined" onClick={handleLoginClick}>
                Entrar
              </ButtonLogin>
              <ButtonRegister variant="contained" onClick={handleRegisterClick}>
                Cadastrar
              </ButtonRegister>
            </Box>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                display: { xs: "flex", md: "none" },
                color: "inherit",
              }}
            >
              <MenuIcon />
            </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography  sx={{ textAlign: "center" }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
          </Box>
        </Box>
        
      </Box>


    </Box>
  );
};

export default NavBar;
