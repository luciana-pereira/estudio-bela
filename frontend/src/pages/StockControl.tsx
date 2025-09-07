import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import DashboardAppBar from "../components/DashboardAppBar/DashboardAppBar";
import Sidebar from "../components/Sidebar/Sidebar";
import Avatar from "../assets/img/avatar.png";

interface ProductForm {
  name: string;
  quantity: number;
  action: "entry" | "exit";
  image?: FileList;
}

interface Movement {
  name: string;
  quantity: number;
  action: "entry" | "exit";
  timestamp: string;
  imageUrl?: string;
}

interface Filter {
  name: string;
  action: string;
  status: string;
}

const drawerWidth = 240;

const initialStockMock: Record<string, number> = {
  "Shampoo Hidratante": 10,
  "Máscara Capilar": 5,
  "Secador de Cabelo": 3,
  "Escova Modeladora": 7,
};

const initialHistoryMock: Movement[] = [
  {
    name: "Shampoo Hidratante",
    quantity: 10,
    action: "entry",
    timestamp: "2025-05-20 14:35",
    imageUrl:
      "https://images.unsplash.com/photo-1585238342028-9b7573f3b00f?auto=format&fit=crop&w=60&q=80",
  },
  {
    name: "Máscara Capilar",
    quantity: 5,
    action: "entry",
    timestamp: "2025-05-21 10:12",
    imageUrl:
      "https://images.unsplash.com/photo-1579758629930-8b61c7e2a978?auto=format&fit=crop&w=60&q=80",
  },
  {
    name: "Secador de Cabelo",
    quantity: 3,
    action: "entry",
    timestamp: "2025-05-22 09:45",
    imageUrl:
      "https://images.unsplash.com/photo-1602810317491-88e1a64f0bf6?auto=format&fit=crop&w=60&q=80",
  },
  {
    name: "Escova Modeladora",
    quantity: 7,
    action: "entry",
    timestamp: "2025-05-23 16:30",
    imageUrl:
      "https://images.unsplash.com/photo-1508873696983-2dfd5898f2a8?auto=format&fit=crop&w=60&q=80",
  },
  {
    name: "Shampoo Hidratante",
    quantity: 2,
    action: "exit",
    timestamp: "2025-05-24 11:00",
    imageUrl:
      "https://images.unsplash.com/photo-1585238342028-9b7573f3b00f?auto=format&fit=crop&w=60&q=80",
  },
];

const StockControl: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<ProductForm>({
    defaultValues: {
      name: "",
      quantity: 0,
      action: "entry",
    },
  });

  const [stock, setStock] = useState<Record<string, number>>(initialStockMock);
  const [history, setHistory] = useState<Movement[]>(initialHistoryMock);
  const [filter, setFilter] = useState<Filter>({
    name: "",
    action: "",
    status: "",
  });

  const handleStockUpdate = (data: ProductForm) => {
    const timestamp = new Date().toLocaleString();
    const imageUrl = data.image?.[0]
      ? URL.createObjectURL(data.image[0])
      : undefined;

    setStock((prev) => {
      const currentQty = prev[data.name] || 0;
      const newQty =
        data.action === "entry"
          ? currentQty + data.quantity
          : Math.max(currentQty - data.quantity, 0);

      return { ...prev, [data.name]: newQty };
    });

    setHistory((prev) => [
      ...prev,
      { ...data, timestamp, imageUrl } as Movement,
    ]);
    reset();
  };

  const productsInStock = Object.entries(stock)
    .filter(([, qty]) => qty > 0)
    .map(([name]) => name);

  const filteredHistory = history.filter((item) => {
    const matchesName = !filter.name || item.name === filter.name;
    const matchesAction = !filter.action || item.action === filter.action;
    const currentQty = stock[item.name] || 0;
    const matchesStatus =
      !filter.status ||
      (filter.status === "in_stock" && currentQty > 0) ||
      (filter.status === "sold" && currentQty === 0);

    return matchesName && matchesAction && matchesStatus;
  });

  const [user, setUser] = useState<{
    nome: string;
    avatarUrl: string;
    type: "adm" | "cliente" | "profissional";
  } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
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
    <Container maxWidth="lg">
      <CssBaseline />
      <DashboardAppBar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} user={user} />
      <Toolbar />
      <Toolbar />
      <Typography variant="h4" textAlign="center" mt={6} mb={4}>
        Controle de Estoque
      </Typography>

      <Grid container spacing={4}>
        {/* Formulário de registro */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box component="form" onSubmit={handleSubmit(handleStockUpdate)} sx={{ mb: 4 }}>
            <Typography variant="h6" mb={2}>
              Registrar Produto
            </Typography>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Nome do produto é obrigatório" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Nome do Produto"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  name="quantity"
                  control={control}
                  rules={{
                    required: "Quantidade é obrigatória",
                    min: { value: 1, message: "Quantidade mínima é 1" },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Quantidade"
                      type="number"
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  name="action"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select label="Ação" fullWidth>
                      <MenuItem value="entry">Entrada</MenuItem>
                      <MenuItem value="exit">Saída</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Registrar Movimento
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" mb={2}>
            Filtrar Movimentações
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                select
                label="Nome do Produto"
                value={filter.name}
                onChange={(e) =>
                  setFilter((f) => ({ ...f, name: e.target.value }))
                }
                fullWidth
              >
                <MenuItem value="">Todos</MenuItem>
                {productsInStock.map((product) => (
                  <MenuItem key={product} value={product}>
                    {product}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                select
                label="Tipo de Ação"
                value={filter.action}
                onChange={(e) =>
                  setFilter((f) => ({ ...f, action: e.target.value }))
                }
                fullWidth
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="entry">Entrada</MenuItem>
                <MenuItem value="exit">Saída</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                select
                label="Status"
                value={filter.status}
                onChange={(e) =>
                  setFilter((f) => ({ ...f, status: e.target.value }))
                }
                fullWidth
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="in_stock">Em Estoque</MenuItem>
                <MenuItem value="sold">Vendido</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          {(filter.name !== "" || filter.action !== "" || filter.status !== "") && (
            <>
            <Typography variant="h6" mb={2}>
                Histórico de Movimentações
            </Typography>
            {filteredHistory.length === 0 ? (
                <Typography>Nenhum resultado encontrado.</Typography>
            ) : (
                filteredHistory.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    p: 2,
                    mb: 2,
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    }}
                >
                    {item.imageUrl && (
                    <img
                        src={item.imageUrl}
                        alt="Produto"
                        width={60}
                        height={60}
                        style={{ borderRadius: 8, objectFit: "cover" }}
                    />
                    )}
                    <Box>
                    <Typography>
                        <strong>Produto:</strong> {item.name}
                    </Typography>
                    <Typography>
                        <strong>Ação:</strong> {item.action === "entry" ? "Entrada" : "Saída"}
                    </Typography>
                    <Typography>
                        <strong>Quantidade:</strong> {item.quantity}
                    </Typography>
                    <Typography>
                        <strong>Data:</strong> {item.timestamp}
                    </Typography>
                    </Box>
                </Box>
                ))
            )}
                </>
  )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default StockControl;
