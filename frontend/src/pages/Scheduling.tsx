import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
  CssBaseline,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Sidebar from "../components/Sidebar/Sidebar";
import ConfirmationModal from "../components/Modal/ConfirmationModal";
import DashboardAppBar from "../components/DashboardAppBar/DashboardAppBar";
import Avatar from "../assets/img/avatar.png";

interface Servico {
  id: number;
  nome: string;
}

interface Profissional {
  id: number;
  nome: string;
  servicos: number[];
}

interface HorarioDisponivel {
  profissionalId: number;
  data: string; 
  horarios: string[]; 
}

const servicos: Servico[] = [
  { id: 1, nome: "Corte de Cabelo" },
  { id: 2, nome: "Coloração" },
  { id: 3, nome: "Design" },
  { id: 4, nome: "Terapia Capilar" },
];

const profissionais: Profissional[] = [
  { id: 1, nome: "Luca Andrade", servicos: [1, 2] },
  { id: 2, nome: "Camila Torres", servicos: [1, 2, 3] },
  { id: 3, nome: "Renata Lima", servicos: [4] },
];

const horariosDisponiveis: HorarioDisponivel[] = [
  {
    profissionalId: 1, // Luca
    data: "2025-11-20",
    horarios: ["09:00", "10:00", "14:00"],
  },
  // {
  //   profissionalId: 2, // Camila
  //   data: "2025-08-22",
  //   horarios: ["11:00", "15:00"],
  // },
  {
    profissionalId: 3, // Renata
    data: "2025-11-22",
    horarios: ["13:00", "16:00"],
  },
];

const drawerWidth = 240;

const Scheduling: React.FC = () => {
  const [servicoSelecionado, setServicoSelecionado] = useState<number | "">("");
  const [profissionalSelecionado, setProfissionalSelecionado] = useState<number | "">("");
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [horariosFiltrados, setHorariosFiltrados] = useState<string[]>([]);
  const [horarioEscolhido, setHorarioEscolhido] = useState<string>("");
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const profissionaisDisponiveis = profissionais.filter((p) =>
    p.servicos.includes(servicoSelecionado as number)
  );

  useEffect(() => {
    if (profissionalSelecionado && dataSelecionada) {
      const dataFormatada = dataSelecionada.toISOString().split("T")[0];

      const disponibilidade = horariosDisponiveis.find(
        (h) =>
          h.profissionalId === profissionalSelecionado &&
          h.data === dataFormatada
      );

      setHorariosFiltrados(disponibilidade ? disponibilidade.horarios : []);
    } else {
      setHorariosFiltrados([]);
    }
  }, [profissionalSelecionado, dataSelecionada]);

const resetFormulario = () => {
  setServicoSelecionado("");
  setProfissionalSelecionado("");
  setDataSelecionada(null);
  setHorariosFiltrados([]);
  setHorarioEscolhido("");
  setHorarioSelecionado(null);
};


const handleAgendar = () => {
    if (dataSelecionada && horarioEscolhido) {
    //   setHorarioSelecionado(horarioEscolhido);
      setOpenModal(true);
    }
  };

  const handleConfirmarAgendamento = () => {
    alert(`Agendamento confirmado para ${horarioEscolhido}!`);
    setOpenModal(false);

    resetFormulario();
  };
  
//   const handleClose = () => {
//     setOpenModal(false);
//     setHorarioSelecionado(null);
//   };
  

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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box component="main" display="flex">
          <CssBaseline />
          <DashboardAppBar
            drawerWidth={drawerWidth}
          />
            <Sidebar user={user} />

            <Container maxWidth="md" sx={{ mt: 8 }}>
                <Typography
                    mt={6}
                    mb={6} 
                    variant="h4"
                    gutterBottom 
                    textAlign={'center'}
                >
                  Agendamento
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    <Grid size={{ xs: 12 }}>
                        <FormControl fullWidth>
                            <InputLabel id="label-servico">Serviço</InputLabel>
                            <Select
                            labelId="label-servico"
                            value={servicoSelecionado}
                            onChange={(e) => {
                                setServicoSelecionado(e.target.value as number);
                                setProfissionalSelecionado("");
                                setDataSelecionada(null);
                                setHorariosFiltrados([]);
                            }}
                            label="Serviço"
                            >
                            {servicos.map((servico) => (
                                <MenuItem key={servico.id} value={servico.id}>
                                {servico.nome}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {servicoSelecionado && (
                        <Grid size={{ xs: 12 }}>
                            <FormControl fullWidth>
                                <InputLabel id="label-profissional">
                                    Profissional
                                </InputLabel>
                                <Select
                                    labelId="label-profissional"
                                    value={profissionalSelecionado}
                                    onChange={(e) => {
                                        setProfissionalSelecionado(e.target.value as number);
                                        setDataSelecionada(null);
                                        setHorarioEscolhido("");
                                        //   setHorariosFiltrados([]);
                                    }}
                                    label="Profissional"
                                    disabled={!servicoSelecionado}
                                >
                                    {profissionaisDisponiveis.map((p) => (
                                        <MenuItem key={p.id} value={p.id}>
                                            {p.nome}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    )}

                    {profissionalSelecionado && (
                        <Grid size={{ xs: 12 }}>
                            <FormControl 
                              fullWidth  
                              // disabled={horariosDisponiveis.filter((h) => h.profissionalId === profissionalSelecionado).length === 0}
                            >
                              <InputLabel id="label-data">Data</InputLabel>
                              <Select
                                labelId="label-data"
                                value={dataSelecionada ? dataSelecionada.toISOString().split("T")[0] : ""}
                                onChange={(e) => {
                                  const dataSelecionadaStr = e.target.value;
                                  setDataSelecionada(new Date(dataSelecionadaStr));
                                  setHorarioEscolhido("");
                                }}
                                label="Data"
                              >
                                {horariosDisponiveis.filter((h) => h.profissionalId === profissionalSelecionado).length === 0 ? (
                                  <MenuItem disabled value="">
                                    Sem datas disponÃ­veis
                                  </MenuItem>
                                ) : (
                                  horariosDisponiveis
                                    .filter((h) => h.profissionalId === profissionalSelecionado)
                                    .map((h) => (
                                      <MenuItem key={h.data} value={h.data}>
                                        {new Date(h.data).toLocaleDateString("pt-BR")}
                                      </MenuItem>
                                    ))
                                )}
                              </Select>
                            </FormControl>

                        </Grid>
                    )}

            {dataSelecionada && (
              <Grid size={{ xs: 12 }}>
                {horariosFiltrados.length > 0 ? (
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Horários disponíveis:</Typography>
                      <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                        {horariosFiltrados.map((horario) => (
                          <Button
                            key={horario}
                            variant={horarioEscolhido === horario ? "contained" : "outlined"}
                            onClick={() => setHorarioEscolhido(horario)}
                          >
                            {horario}
                          </Button>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                ) : (
                  <Typography>Nenhum horário disponível para esta data.</Typography>
                )}
              </Grid>
            )}

        {/* {horariosFiltrados.length > 0 && (
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="label-horario">Horários disponíveis:</InputLabel>
              <Select
                labelId="label-horario"
                value={horarioEscolhido}
                onChange={(e) => setHorarioEscolhido(e.target.value)}
                label="Horário"
              >
                {horariosFiltrados.map((h, idx) => (
                  <MenuItem key={idx} value={h}>
                    {h}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )} */}

        {/* <Grid size={{ xs: 12, md: 6 }}>
            {horariosFiltrados.length > 0 ? (
            <Card>
                <CardContent>
                <Typography variant="h6">Horários disponíveis:</Typography>
                <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                    {horariosFiltrados.map((horario) => (
                    <Button
                        key={horario}
                        variant={horarioEscolhido === horario ? "contained" : "outlined"}
                        onClick={() => setHorarioEscolhido(horario)}
                    >
                        {horario}
                    </Button>
                    ))}
                </Box>
                </CardContent>
            </Card>
            ) : (
            <Typography variant="body1">
                {dataSelecionada && "Nenhum horário disponível para esta data."}
            </Typography>
            )}
        </Grid> */}

        {/* <Grid>
          <Card>
            <CardContent>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAgendar}
              >
                Confirmar Agendamento
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box> */}

                <Grid size={{ xs: 12 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleAgendar}
                        disabled={
                        !servicoSelecionado ||
                        !profissionalSelecionado ||
                        !dataSelecionada ||
                        !horarioEscolhido
                        }
                    >
                        Agendar
                    </Button>
                </Grid>
            </Grid>
            </Container>
        </Box>

        <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirmation={handleConfirmarAgendamento}
        servico={servicos.find((s) => s.id === servicoSelecionado)?.nome}
        profissional={profissionais.find((p) => p.id === profissionalSelecionado)?.nome}
        data={dataSelecionada?.toLocaleDateString()}
        horario={horarioEscolhido}
      />    
      </LocalizationProvider>
  );
};

export default Scheduling;

