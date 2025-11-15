import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  CssBaseline,
  Toolbar,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Value } from "react-calendar/dist/cjs/shared/types";
import Sidebar from "../components/Sidebar/Sidebar";
import DashboardAppBar from "../components/DashboardAppBar/DashboardAppBar";
import Avatar from '../assets/img/avatar.png'

interface Agendamento {
  id: number;
  data: string;
  descricao: string;
}

const drawerWidth = 240;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (value: Value) => {
    if (Array.isArray(value)) {
      setSelectedDate(value[0]);
    } else {
      setSelectedDate(value);
    }
  };

  const agendamentosFuturos: Agendamento[] = [
    { id: 1, data: "2025-12-21", descricao: "Corte de cabelo" },
    { id: 2, data: "2025-12-21", descricao: "Coloração" },
  ];

  const agendamentosPassados: Agendamento[] = [
    { id: 3, data: "2025-08-10", descricao: "Manicure" },
    { id: 4, data: "2025-08-15", descricao: "Escova" },
  ];

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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DashboardAppBar
        drawerWidth={drawerWidth}
      />

      <Sidebar drawerWidth={drawerWidth} user={user} />

      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Toolbar />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Grid container spacing={3} direction="column">
                <Grid>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Agenda</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Calendar
                                onChange={handleDateChange}
                                value={selectedDate}
                            />
                            {selectedDate && (
                                <Typography variant="body2" mt={2}>
                                    Data selecionada: {format(selectedDate, "dd/MM/yyyy")}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Agendamentos Futuros</Typography>
                            <Divider sx={{ my: 1 }} />
                            {agendamentosFuturos.map((ag) => (
                                <Box key={ag.id} mb={1}>
                                    <Typography variant="body2">
                                        {format(new Date(ag.data), "dd/MM/yyyy")} - {ag.descricao}
                                    </Typography>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid>
                    <Card>
                        <CardContent>
                        <Typography variant="h6">Agendamentos Passados</Typography>
                        <Divider sx={{ my: 1 }} />
                            {agendamentosPassados.map((ag) => (
                                <Box key={ag.id} mb={1}>
                                    <Typography variant="body2">
                                        {format(new Date(ag.data), "dd/MM/yyyy")} - {ag.descricao}
                                    </Typography>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
          </Grid>

          {/* <Grid size={{ xs: 12, md: 4 }}>
          </Grid> */}

          {/* <Grid size={{ xs: 12, md: 4}}>
          </Grid> */}

          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={3} direction="column">
                <Grid>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Alertas e Mensagens</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2" mb={2}>
                                Você tem 2 mensagens não lidas.
                            </Typography>
                            <Button 
                                variant="outlined" 
                                sx={{
                                    borderColor: "#B76E79",
                                    color: "#B76E79",
                                }}
                                onClick={() => navigate("/avisos")}
                            >
                                Ver Avisos
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Novo Agendamento</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2" mb={2}>
                                Agende um novo serviço com nossos profissionais.
                            </Typography>
                            <Button 
                                variant="contained" 
                                sx={{
                                    backgroundColor: "#B76E79",
                                }} 
                                onClick={() => navigate("/agendamento")}
                            >
                                Agendar Serviço
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

          </Grid>

          {/* <Grid size={{ xs: 12, md: 6 }}>
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;

