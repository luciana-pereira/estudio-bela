import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CssBaseline,
  Toolbar,
  TextField,
  MenuItem,
} from "@mui/material";
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { servicos, produtos } from "./mockData";
import { Servico, Produto } from "./types";
import { format, isAfter, isBefore } from "date-fns";
import DashboardAppBar from "../../components/DashboardAppBar/DashboardAppBar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Avatar from "../../assets/img/avatar.png";

const drawerWidth = 240;

const FinancialReport: React.FC = () => {
  const [filtroProfissional, setFiltroProfissional] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [filtroProduto, setFiltroProduto] = useState<string>("");
  const [filtroTipo, setFiltroTipo] = useState<string>("");
  const [dataProdutoInicio, setDataProdutoInicio] = useState<Date | null>(null);
  const [dataProdutoFim, setDataProdutoFim] = useState<Date | null>(null);


  const exportToCSV = () => {
    const dadosParaExportar = [
      ...servicosFiltrados.map((s) => ({
        tipo: "Serviço",
        data: format(new Date(s.data), "dd/MM/yyyy"),
        profissional: s.profissional,
        descricao: s.descricao,
        valor: s.valor.toFixed(2),
      })),
      ...produtosFiltrados.map((p) => ({
        tipo: "Produto",
        data: format(new Date(p.data), "dd/MM/yyyy"),
        nome: p.nome,
        tipo_movimentacao: p.tipo,
        quantidade: p.quantidade,
        valorUnitario: p.valorUnitario.toFixed(2),
        total: (p.quantidade * p.valorUnitario).toFixed(2),
      })),
    ];
  
    const csv = unparse(dadosParaExportar);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "relatorio_financeiro.csv");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
  
    doc.text("Serviços Prestados", 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [["Data", "Profissional", "Serviço", "Valor (R$)"]],
      body: servicosFiltrados.map((s) => [
        format(new Date(s.data), "dd/MM/yyyy"),
        s.profissional,
        s.descricao,
        s.valor.toFixed(2),
      ]),
    });
  
    const finalY = (doc as any).lastAutoTable.finalY || 40;
    doc.text("Movimentação de Produtos", 14, finalY + 10);
    autoTable(doc, {
      startY: finalY + 15,
      head: [["Data", "Produto", "Tipo", "Quantidade", "Valor Unitário", "Total"]],
      body: produtosFiltrados.map((p) => [
        format(new Date(p.data), "dd/MM/yyyy"),
        p.nome,
        p.tipo,
        p.quantidade,
        p.valorUnitario.toFixed(2),
        (p.quantidade * p.valorUnitario).toFixed(2),
      ]),
    });
  
    doc.save("relatorio_financeiro.pdf");
  };
  
  
  const produtosUnicos = Array.from(new Set(produtos.map((p) => p.nome)));
  const tiposUnicos = ["entrada", "saida"];
  const profissionaisUnicos = Array.from(new Set(servicos.map((s) => s.profissional)));

  const normalizeDate = (date: Date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  };

  const servicosFiltrados = servicos.filter((s) => {
    const dataServico = normalizeDate(new Date(s.data));
    const inicio = dataInicio ? normalizeDate(dataInicio) : null;
    const fim = dataFim ? normalizeDate(dataFim) : null;

    const dentroDoPeriodo =
      (!inicio || !isBefore(dataServico, inicio)) &&
      (!fim || !isAfter(dataServico, fim));

    const profissionalCorresponde =
      !filtroProfissional || s.profissional === filtroProfissional;

    return (dentroDoPeriodo && profissionalCorresponde);
  });

  const produtosFiltrados = produtos.filter((p) => {
    const dataProduto = normalizeDate(new Date(p.data)); 
    const inicio = dataProdutoInicio ? normalizeDate(dataProdutoInicio) : null;
    const fim = dataProdutoFim ? normalizeDate(dataProdutoFim) : null;
  
    const dentroDoPeriodo =
      (!inicio || !isBefore(dataProduto, inicio)) &&
      (!fim || !isAfter(dataProduto, fim));
  
    const produtoCorresponde = !filtroProduto || p.nome === filtroProduto;
    const tipoCorresponde = !filtroTipo || p.tipo === filtroTipo;
  
    return (dentroDoPeriodo && produtoCorresponde && tipoCorresponde);
  });
  
  const totalServicos = servicosFiltrados.reduce((acc: any, s: any) => acc + s.valor, 0);

  const totalEntradas = produtosFiltrados
    .filter((p: any) => p.tipo === "entrada")
    .reduce((acc: any, p: any) => acc + p.valorUnitario * p.quantidade, 0);

  const totalSaidas = produtosFiltrados
    .filter((p: any) => p.tipo === "saida")
    .reduce((acc: any, p: any) => acc + p.valorUnitario * p.quantidade, 0);

  const saldo = totalServicos + totalEntradas - totalSaidas;

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
    <Box sx={{  display: "flex" }}>
      <CssBaseline />
      <DashboardAppBar
        drawerWidth={drawerWidth}
      />

      <Sidebar drawerWidth={drawerWidth} user={user} />

      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Toolbar />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Filtros</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4}}>
                      <TextField
                        fullWidth
                        select
                        label="Profissional"
                        value={filtroProfissional}
                        onChange={(e) => setFiltroProfissional(e.target.value)}
                      >
                        <MenuItem value="">Todos</MenuItem>
                        {profissionaisUnicos.map((prof) => (
                          <MenuItem key={prof} value={prof}>
                            {prof}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4}}>
                      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                        <DatePicker
                          label="Data Início"
                          value={dataInicio}
                          onChange={setDataInicio}
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4}}>
                      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                        <DatePicker
                          label="Data Fim"
                          value={dataFim}
                          onChange={setDataFim}
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>


          {/* Tabela de Serviços Prestados */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Serviços Prestados</Typography>
                <Divider sx={{ my: 1 }} />
                <Paper>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Data</TableCell>
                        <TableCell>Profissional</TableCell>
                        <TableCell>Serviço</TableCell>
                        <TableCell>Valor (R$)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {servicosFiltrados.map((s: Servico) => (
                        <TableRow key={s.id}>
                          <TableCell>{format(new Date(s.data), "dd/MM/yyyy")}</TableCell>
                          <TableCell>{s.profissional}</TableCell>
                          <TableCell>{s.descricao}</TableCell>
                          <TableCell>{s.valor.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Filtros de Produtos</Typography>
                <Divider sx={{ my: 1 }} />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <TextField
                      fullWidth
                      select
                      label="Produto"
                      value={filtroProduto}
                      onChange={(e) => setFiltroProduto(e.target.value)}
                    >
                      <MenuItem value="">Todos</MenuItem>
                      {produtosUnicos.map((prod) => (
                        <MenuItem key={prod} value={prod}>
                          {prod}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <TextField
                      fullWidth
                      select
                      label="Tipo"
                      value={filtroTipo}
                      onChange={(e) => setFiltroTipo(e.target.value)}
                    >
                      <MenuItem value="">Todos</MenuItem>
                      {tiposUnicos.map((tipo) => (
                        <MenuItem key={tipo} value={tipo}>
                          {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                      <DatePicker
                        label="Data Início"
                        value={dataProdutoInicio}
                        onChange={setDataProdutoInicio}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                      <DatePicker
                        label="Data Fim"
                        value={dataProdutoFim}
                        onChange={setDataProdutoFim}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Tabela de Produtos */}
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">Movimentação de Produtos</Typography>
                <Divider sx={{ my: 1 }} />
                <Paper>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Data</TableCell>
                        <TableCell>Produto</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Quantidade</TableCell>
                        <TableCell>Valor Unitário (R$)</TableCell>
                        <TableCell>Total (R$)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {produtosFiltrados.map((p: Produto) => (
                        <TableRow key={p.id}>
                          <TableCell>{format(new Date(p.data), "dd/MM/yyyy")}</TableCell>
                          <TableCell>{p.nome}</TableCell>
                          <TableCell>{p.tipo === "entrada" ? "Entrada" : "Saída"}</TableCell>
                          <TableCell>{p.quantidade}</TableCell>
                          <TableCell>{p.valorUnitario.toFixed(2)}</TableCell>
                          <TableCell>{(p.quantidade * p.valorUnitario).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </CardContent>
            </Card>
          </Grid>

          {/* Resumo Financeiro */}
          <Grid size={{ xs: 12, md: 6}}>
            <Grid container spacing={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Resumo Financeiro</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography>💇 Serviços: R$ {totalServicos.toFixed(2)}</Typography>
                  <Typography>📦 Entradas: R$ {totalEntradas.toFixed(2)}</Typography>
                  <Typography>🛍️ Saídas: R$ {totalSaidas.toFixed(2)}</Typography>
                  <Typography sx={{ fontWeight: "bold", mt: 2 }}>
                    💰 Saldo: R$ {saldo.toFixed(2)}
                  </Typography>

                  <Divider sx={{ my: 4 }} />

                  <Grid 
                    spacing={4} 
                  >
                    <Button variant="outlined" sx={{ marginRight: 3 }} color="primary" onClick={exportToCSV}>
                      Exportar em CSV
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={exportToPDF}>
                      Exportar em PDF
                    </Button>
                  </Grid>
                </CardContent>
              </Card>

            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FinancialReport;
