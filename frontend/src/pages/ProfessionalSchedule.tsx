import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  CssBaseline,
  Toolbar,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import Sidebar from '../components/Sidebar/Sidebar';
import DashboardAppBar from '../components/DashboardAppBar/DashboardAppBar';
import Avatar from '../assets/img/avatar.png'

type Agendamento = {
  id: number;
  profissional: string;
  cliente: string;
  servico: string;
  data: string;
  status: 'pendente' | 'confirmado' | 'cancelado';
};

const profissionais = ['Luca Andrade', 'Camila Torres', 'Renata Lima'];

const agendamentosMock: Agendamento[] = [
  {
    id: 1,
    profissional: 'Luca Andrade',
    cliente: 'Amanda Lira',
    servico: 'Corte de Cabelo',
    data: '2025-05-18T10:00:00',
    status: 'pendente',
  },
  {
    id: 2,
    profissional: 'Renata Lima',
    cliente: 'Fernanda Bernadino',
    servico: 'Tratamento Capilar',
    data: '2025-05-19T14:00:00',
    status: 'confirmado',
  },
];

const drawerWidth = 240;

const  ProfessionalSchedule = () => {
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<string>('');
  const [dataInicio, setDataInicio] = useState<any | null>(dayjs().startOf('month'));
  const [dataFim, setDataFim] = useState<any | null>(dayjs().endOf('month'));
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    filtrarAgendamentos();
  }, [profissionalSelecionado, dataInicio, dataFim]);

  const filtrarAgendamentos = () => {
    const filtrado = agendamentosMock.filter((a) => {
      const dentroDoPeriodo =
        (!dataInicio || dayjs(a.data).isAfter(dataInicio.subtract(1, 'day'))) &&
        (!dataFim || dayjs(a.data).isBefore(dataFim.add(1, 'day')));

      const doProfissional = !profissionalSelecionado || a.profissional === profissionalSelecionado;

      return dentroDoPeriodo && doProfissional;
    });

    setAgendamentos(filtrado);
  };

  const atualizarStatus = (id: number, novoStatus: 'confirmado' | 'cancelado') => {
    setAgendamentos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: novoStatus } : a))
    );
  };

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardAppBar
            drawerWidth={drawerWidth}
        />

        <Sidebar drawerWidth={drawerWidth} user={user} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // ml: `${drawerWidth}px`,
            p: 4,
          }}
        >
            <Toolbar /><Toolbar />

            <Typography variant="h4" gutterBottom>
                Agenda dos Profissionais
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
                <FormControl fullWidth>
                <InputLabel>Profissional</InputLabel>
                <Select
                    value={profissionalSelecionado}
                    label="Profissional"
                    onChange={(e) => setProfissionalSelecionado(e.target.value)}
                >
                    <MenuItem value="">Todos</MenuItem>
                    {profissionais.map((prof) => (
                    <MenuItem key={prof} value={prof}>
                        {prof}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
                <DatePicker
                label="Início"
                value={dataInicio}
                onChange={(newValue) => setDataInicio(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }} >
                <DatePicker
                label="Fim"
                value={dataFim}
                onChange={(newValue) => setDataFim(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
                />
            </Grid>
            </Grid>

            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell>Profissional</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Serviço</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Ações</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {agendamentos.length === 0 ? (
                    <TableRow>
                    <TableCell colSpan={6} align="center">
                        Nenhum agendamento encontrado.
                    </TableCell>
                    </TableRow>
                ) : (
                    agendamentos.map((ag) => (
                    <TableRow key={ag.id}>
                        <TableCell>{dayjs(ag.data).format('DD/MM/YYYY HH:mm')}</TableCell>
                        <TableCell>{ag.profissional}</TableCell>
                        <TableCell>{ag.cliente}</TableCell>
                        <TableCell>{ag.servico}</TableCell>
                        <TableCell>{ag.status}</TableCell>
                        <TableCell>
                        <Button
                            variant="contained"
                            size="small"
                            color="success"
                            disabled={ag.status !== 'pendente'}
                            onClick={() => atualizarStatus(ag.id, 'confirmado')}
                            sx={{ mr: 1 }}
                        >
                            Confirmar
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            color="error"
                            disabled={ag.status !== 'pendente'}
                            onClick={() => atualizarStatus(ag.id, 'cancelado')}
                        >
                            Cancelar
                        </Button>
                        </TableCell>
                    </TableRow>
                    ))
                )}
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default ProfessionalSchedule;
