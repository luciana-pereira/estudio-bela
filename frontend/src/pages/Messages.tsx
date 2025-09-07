import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  InputLabel,
  FormControl,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Sidebar from "../components/Sidebar/Sidebar";
import ConfirmationMessage from "../components/Modal/ConfirmationMessage";
import Avatar from "../assets/img/avatar.png";

interface Mensagem {
    titulo: string;
    descricao: string;
    profissional: string;
    lida: boolean;
}

const Messages: React.FC = () => {
    const profissionais = ["Amanda", "Carlos", "Juliana"];
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [profissional, setProfissional] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [aba, setAba] = useState(0);
//   const [mensagem, setMensagem] = useState<string[] | Mensagem>([""]);
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      titulo: "Promoções de Setembro",
      descricao: "Olá, gostaria de saber se há promoções esse mês.",
      profissional: "Amanda",
      lida: false,
    },
    {
      titulo: "Confirmação de horário",
      descricao: "Bom dia! Confirmei meu horário para sexta-feira.",
      profissional: "Carlos",
      lida: false,
    },
    {
      titulo: "Novo agendamento",
      descricao: "Gostaria de agendar uma limpeza de pele para semana que vem.",
      profissional: "Juliana",
      lida: false,
    },
    {
      titulo: "Cancelamento",
      descricao: "Preciso cancelar meu horário de amanhã.",
      profissional: "",
      lida: true,
    }
  ]);
  

  const enviarMensagem = () => {
    if (titulo.trim() && descricao.trim()) {
      const novaMensagem: Mensagem = {
        titulo,
        descricao,
        profissional,
        lida: false,
      };
      setMensagens([...mensagens, novaMensagem]);
      setTitulo("");
      setDescricao("");
      setProfissional("");
      setModalOpen(true);
    }
  };

  const mensagensLidas = mensagens.filter((m: Mensagem) => m.lida);
  const mensagensPendentes = mensagens.filter((m: Mensagem) => !m.lida);

  const marcarComoLida = (index: number) => {
    const novaLista = [...mensagens];
    novaLista[index].lida = true;
    setMensagens(novaLista);
  };

  const avisos = [
    "✨ Promoção de hidratação capilar até o fim do mês!",
    "📅 O salão estará fechado no feriado de 7 de setembro.",
    "🎉 Novas profissionais disponíveis para agendamentos de manicure.",
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
    <Box display="flex">
      {/* <Sidebar user={{
              nome: "",
              avatarUrl: ""
          }} /> */}
      <Sidebar user={user} />
      <Box flexGrow={1} p={4}>
        <Typography variant="h4" gutterBottom>
          Avisos e Mensagens
        </Typography>

        {/* Seção de Avisos */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Avisos do Salão
          </Typography>
          <List>
            {avisos.map((aviso, index) => (
              <ListItem key={index}>
                <ListItemText primary={aviso} />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Divider sx={{ my: 2 }} />

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        {/* Aba de Lidas/Pendentes */}
        <Tabs value={aba} onChange={(_, v) => setAba(v)} sx={{ mb: 3 }}>
          <Tab label={`Pendentes (${mensagensPendentes.length})`} />
          <Tab label={`Lidas (${mensagensLidas.length})`} />
        </Tabs>

        {/* Lista de mensagens */}
        <Box mb={4}>
          {(aba === 0 ? mensagensPendentes : mensagensLidas).map((msg: Mensagem, index: number) => {
            const indexOriginal = mensagens.findIndex(
              (m: Mensagem) => m.titulo === msg.titulo && m.descricao === msg.descricao
            );

            return (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{msg.titulo}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" gutterBottom>
                    {msg.descricao}
                  </Typography>
                  <Typography variant="caption">
                    Encaminhado para: {msg.profissional || "Nenhum"}
                  </Typography>
                  {!msg.lida && (
                    <Box mt={2}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => marcarComoLida(indexOriginal)}
                      >
                        Marcar como lida
                      </Button>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>

        </Paper>

        <Divider sx={{ my: 2 }} />

        {/* Seção de Mensagens */}
        {/* <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Mensagens
          </Typography> */}

          {/* Mensagens recebidas */}
          {/* <Box mb={2}>
            <List>
              {mensagens.map((msg, index) => (
                <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                  <Paper sx={{ p: 2, width: "100%" }} variant="outlined">
                    <ListItemText primary={msg} />
                  </Paper>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box display="flex" gap={2} mt={2}>
            <TextField
              fullWidth
              label="Digite sua mensagem"
              variant="outlined"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />
            <Button variant="contained" onClick={handleEnviarMensagem}>
              Enviar
            </Button>
          </Box>
        </Paper> */}

     {/* Formulário de envio */}
     <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Nova Mensagem
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              fullWidth
            />
            <TextField
              label="Descrição"
              multiline
              rows={4}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Encaminhar para</InputLabel>
              <Select
                value={profissional}
                onChange={(e) => setProfissional(e.target.value)}
                label="Encaminhar para"
              >
                <MenuItem value="">Nenhum</MenuItem>
                {profissionais.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box textAlign="right">
              <Button variant="contained" onClick={enviarMensagem}>
                Enviar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>


        {/* Modal de confirmação */}
        <ConfirmationMessage
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title={"Mensagem Enviada"}
              message="Sua mensagem foi enviada com sucesso!"       />    
    </Box>
  );
};

export default Messages;
