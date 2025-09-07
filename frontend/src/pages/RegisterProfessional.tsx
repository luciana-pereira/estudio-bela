import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  TextField,
  CssBaseline,
  Toolbar,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
} from "@mui/material";
import Sidebar from "../components/Sidebar/Sidebar";
import DashboardAppBar from "../components/DashboardAppBar/DashboardAppBar";
import Avatar from "../assets/img/avatar.png"

interface ProfessionalForm {
  name: string;
  email: string;
  phone: string;
  specialty: string;
}

const drawerWidth = 240;

const mockProfessionals: ProfessionalForm[] = [
  {
    name: "Luca Andrade",
    email: "luca12@gmail.com",
    phone: "11999999999",
    specialty: "Cabelereiro",
  },
  {
    name: "Camila Torres",
    email: "ka@gmail.com",
    phone: "11888888888",
    specialty: "Tintura",
  },
  {
    name: "Renata Lira",
    email: "re-lira@gmail.com",
    phone: "11888888888",
    specialty: "Tratamento Capilar",
  },
];

const RegisterProfessional: React.FC = () => {
  const [user, setUser] = useState<{
    nome: string;
    avatarUrl: string;
    type: "adm" | "cliente" | "profissional";
  } | null>(null);

  const [selectedProfessional, setSelectedProfessional] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProfessionalForm>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialty: "",
    },
  });

  const onSubmit = (data: ProfessionalForm) => {
    if (selectedProfessional) {
      console.log("Atualizando profissional:", data);
    } else {
      console.log("Cadastrando novo profissional:", data);
    }
    reset();
    setSelectedProfessional("");
  };

  const handleProfessionalSelect = (email: string) => {
    setSelectedProfessional(email);

    const found = mockProfessionals.find((prof) => prof.email === email);
    if (found) {
      setValue("name", found.name);
      setValue("email", found.email);
      setValue("phone", found.phone);
      setValue("specialty", found.specialty);
    } else {
      reset(); 
    }
  };

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
    <Box component="main" sx={{ display: "flex" }}>
      <CssBaseline />
      <DashboardAppBar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} user={user} />

      <Container sx={{ mt: 10, ml: `${drawerWidth}px` }}>
        <Typography mt={6} mb={6} variant="h4" gutterBottom textAlign="center">
          Cadastro e Edição de Profissionais
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {/* Seletor de Profissionais */}
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel id="select-professional">Selecionar Profissional</InputLabel>
              <Select
                labelId="select-professional"
                value={selectedProfessional}
                label="Selecionar Profissional"
                onChange={(e) => handleProfessionalSelect(e.target.value)}
              >
                <MenuItem value="">Novo Profissional</MenuItem>
                {mockProfessionals.map((prof) => (
                  <MenuItem key={prof.email} value={prof.email}>
                    {prof.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Formulário */}
          <Grid size={{ xs: 12 }}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Nome é obrigatório" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "E-mail é obrigatório",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "E-mail inválido",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="E-mail"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Telefone é obrigatório" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Telefone"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="specialty"
              control={control}
              rules={{ required: "Especialidade é obrigatória" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.specialty}>
                  <InputLabel id="specialty-label">Especialidade</InputLabel>
                  <Select
                    {...field}
                    labelId="specialty-label"
                    label="Especialidade"
                    value={field.value || ""}
                  >
                    <MenuItem value="Cabelereiro">Cabelereiro</MenuItem>
                    <MenuItem value="Tratamento Capilar">Tratamento Capilar</MenuItem>
                    <MenuItem value="Tintura">Tintura</MenuItem>
                    <MenuItem value="Design">Design</MenuItem>
                  </Select>
                  <Typography variant="caption" color="error">
                    {errors.specialty?.message}
                  </Typography>
                </FormControl>
              )}
            />
          </Grid>

          {/* Botão */}
          <Grid size={{ xs: 12 }} sx={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, width: "100%" }}
              onClick={handleSubmit(onSubmit)}
            >
              {selectedProfessional ? "Salvar" : "Cadastrar"}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RegisterProfessional;
