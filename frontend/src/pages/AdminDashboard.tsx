import React, { useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  Grid,
} from "@mui/material";
import {
  CalendarMonth,
  AddBusiness,
  GroupAdd,
  Inventory2,
  AttachMoney,
  EventAvailable,
} from "@mui/icons-material";
import Sidebar from "../components/Sidebar/Sidebar";
import DashboardCard from "../components/DashboardCard/DashboardCard";
import DashboardAppBar from "../components/DashboardAppBar/DashboardAppBar";
import Avatar from '../assets/img/avatar.png'

const drawerWidth = 240;

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<{
    nome: string;
    avatarUrl: string;
    type: "adm" | "cliente" | "profissional";
  } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    console.log(userData);
    if (userData) {
      const parsedUser = JSON.parse(userData);

      const avatarUrl = parsedUser.avatar || Avatar;

      setUser({
        nome: parsedUser.name || "Usuário",
        avatarUrl: avatarUrl,
        type: parsedUser.role_id === 1 ? "adm" : "cliente", 
      });
    }
  }, []);

  if (!user) return null;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DashboardAppBar
        drawerWidth={drawerWidth}
      />

      <Sidebar drawerWidth={drawerWidth} user={user} />

      <Box component="main" sx={{ flexGrow: 1, px: 4, pt: 8, pb: 4 }}>
        <Toolbar />

        <Grid container spacing={3}>
          <DashboardCard
            title="Agenda dos Profissionais"
            description="Veja os agendamentos de todos os profissionais"
            icon={<CalendarMonth fontSize="large" />}
            route="/agenda"
          />
          <DashboardCard
            title="Serviços"
            description="Gerencie os serviços do salão"
            icon={<AddBusiness fontSize="large" />}
            route="/servicos"
          />
          <DashboardCard
            title="Profissionais"
            description="Adicione e edite profissionais"
            icon={<GroupAdd fontSize="large" />}
            route="/profissionais"
          />
          <DashboardCard
            title="Estoque"
            description="Controle a entrada e saída de produtos"
            icon={<Inventory2 fontSize="large" />}
            route="/estoque"
          />
          <DashboardCard
            title="Relatório Financeiro"
            description="Visualize o desempenho financeiro"
            icon={<AttachMoney fontSize="large" />}
            route="/financeiro"
          />
          <DashboardCard
            title="Agendamento de Serviço"
            description="Agende um novo horário para um cliente"
            icon={<EventAvailable fontSize="large" />}
            route="/agendamento"
          />
        </Grid>
      </Box>
    </Box>
    
  );
};

export default AdminDashboard;
