import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from "react-router-dom";

interface User {
    nome: string;
    avatarUrl: string;
    type:  string; //"adm" | "user";
}

interface SidebarProps {
    drawerWidth?: number;
    user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth = 240, user }) => {
  const navigate = useNavigate();

  const commonItems = [
    {
      label: "Início",
      icon: <HomeIcon sx={{ fontSize: { xs: "auto", md: "2rem" }}}/>,
      route: "/dashboard"
    },
    {
      label: "Agendamento",
      icon: <EventIcon sx={{ fontSize: { xs: "auto", md: "2rem" }}}/>,
      route: "/agendamento"
    },
  ];

  const adminItems = [
    { label: "Agenda dos Profissionais", icon: <CalendarMonthIcon sx={{ fontSize: { xs: "auto", md: "2rem" }}} />, route: "/agenda" },
    { label: "Cadastrar Serviços", icon: <AddBusinessIcon sx={{ fontSize: { xs: "auto", md: "2rem" }}} />, route: "/servicos" },
    { label: "Cadastrar Profissionais", icon: <GroupAddIcon sx={{ fontSize: { xs: "auto", md: "2rem" }}} />, route: "/profissionais" },
    { label: "Estoque", icon: <Inventory2Icon sx={{ fontSize: { xs: "auto", md: "2rem" }}}/>, route: "/estoque" },
    { label: "Relatório Financeiro", icon: <AttachMoneyIcon sx={{ fontSize: { xs: "auto", md: "2rem" }}}/>, route: "/financeiro" },
  ];

  const logoutItem = {
    label: "Sair",
    icon: <LogoutIcon sx={{ fontSize: { xs: "auto", md: "2rem" }}}/>,
    route: "/inicio"
    // route: "/logout"
  };

  const menuItems = user.type === "adm"
    ? [...commonItems, ...adminItems, logoutItem]
    : [...commonItems, logoutItem];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            paddingTop: 2,
            color: 'white',
            background: 'linear-gradient(140deg, #D7C4A1 2%, #864A4A 83%)',
        },
      }}
    >
      <Box
        sx={{
            textAlign: 'center',
            mb: 2
        }}
       >
        <Avatar src={user.avatarUrl} sx={{ margin: "0 auto", width: 200, height: 200 }} />
        <Typography 
            variant="subtitle1" 
            sx={{ 
                mt: 1, 
                fontWeight: 'bold'
            }} 
        >
          {user.nome}
        </Typography>
      </Box>
      <Divider sx={{ mb: 5 }} />
      <List>
        {menuItems.map(item => (
            <ListItem key={item.label} onClick={() => navigate(item.route)}>
                <ListItemIcon 
                    sx={{
                        color: "white",
                    }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
            </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
