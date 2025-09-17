import React from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoEstudioBela from "../../assets/img/logo-preta-estudio-bela.png";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router";

interface DashboardAppBarProps {
  drawerWidth?: number;
  onMenuClick?: () => void;
}

const DashboardAppBar: React.FC<DashboardAppBarProps> = ({
  drawerWidth,
  onMenuClick,
}) => {
    const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        height: 90,
        ml: drawerWidth, 
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        background: 'linear-gradient(140deg, #D7C4A1 2%, #864A4A 83%)',
      }}
    >
      <Toolbar>
        {onMenuClick && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box 
            sx={{
                width: '100%', 
                display: "flex", 
                alignItems: "center", 
                justifyContent: 'center',
                mr: 2, 
                py: 4
            }}
        >
          <img
            src={LogoEstudioBela}
            alt={"Texto com as palavras Estudio de Bela"}
            style={{ height: 110, objectFit: "contain" }}
          />
        </Box>
        {/* <Box 
            sx={{
                width: '100%', 
                display: "flex", 
                alignItems: "center", 
                justifyContent: 'center',
                mr: 2, 
            }}
        >
          <img
            src={Logo}
            alt={"Texto com as palavras Estudio de Bela"}
            style={{ height: 20, objectFit: "contain" }}
          />
        </Box> */}
        <Box>
            <Button 
                sx={{color: "white"}}
                onClick={() => navigate("/inicio")}
            >
                <LogoutIcon
                    sx={{ fontSize: { xs: "auto", md: "2rem" } }}
                />
            </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardAppBar;
