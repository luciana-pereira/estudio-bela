import React, { FormEvent } from 'react';
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DynamicBreadcrumbs from "../../components/DynamicBreadcrumbs/DynamicBreadcrumbs";
import Input from '../../components/Forms/Input/Input';
import Button, { ButtonProps } from "@mui/material/Button";
import { 
  Box, 
  Typography,
  FormGroup, 
  FormControlLabel, 
  Checkbox, 
  styled 
} from "@mui/material";
import Ilustration from '../../assets/img/img-register.png';
import LogoEstudioBela from '../../assets/img/logo-branca-estudio-bela.png';

interface RegisterFormData {
  name: string;
  cpf: string;
  dateOfBirth: string;
  cellPhone: string;
  email: string;
  password: string;
}

const validationSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório').matches(/^\d{11}$/, 'CPF deve conter 11 dígitos'),
  dateOfBirth: yup.string().required('Data de nascimento é obrigatória'),
  cellPhone: yup.string().required('Número de celular é obrigatório').matches(/^\d{11}$/, 'Celular deve conter 11 dígitos'),
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha é obrigatória').min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

const Register = () => {

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      cpf: '',
      dateOfBirth: '',
      cellPhone: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data: RegisterFormData) => {
    const API_URL = "https://estudio-bela.vercel.app";

    try {
      const response = await fetch(`${API_URL}/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          username: data.name,
          hashed_password: data.password,        
        }),
      });

      if (!response.ok) throw new Error('Erro ao registrar');

      const responseData = await response.json();
      console.log('Registrado com sucesso:', responseData);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const ButtonRegister = styled(Button)<ButtonProps>(() => ({
    color: "#B76E79",
    border: "1px solid #B76E79",
    fontWeight: "bold",
    textTransform: "none",
    fontSize: "1.2rem",
    "&:hover": {
      backgroundColor: 'rgb(224, 195, 199)',
      color: 'white'
    },
  }));

  return (
    <Box
      component="section"
      aria-labelledby="form-container-register"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        color: 'white',
        background: 'linear-gradient(140deg, #D7C4A1 2%, #864A4A 83%)'
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "50%",
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >        
        <img 
          src={Ilustration} 
          alt="Ilustração de uma mulher preenchendo formulario de cadastro" 
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </Box>
      <Box 
        sx={{
          width: { xs: "100%", md: "50%" },
          maxWidth: "600px",
          padding: { xs: "20px", md: "40px" },
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <DynamicBreadcrumbs />
        <Box sx={{ textAlign: "center" }}>
          <img 
            src={LogoEstudioBela}
            style={{
              padding: "5px",
              width: "70%",
              maxWidth: "270px",
            }} 
            alt="Logo contendo as palavras Estúdio de Bela." 
          />
        </Box>

        <Typography
          component="p"
          sx={{
            fontSize: { xs: "0.9rem", md: "1.2rem" },
            mt: 1,
            mb: 2,
            textAlign: "center"
          }}
        >
          Preencha as informações abaixo para criar sua conta:
        </Typography>

        <form
          onSubmit={handleSubmit(onSubmit)} 
          autoComplete="off"
        >
          <Controller 
            name='name'
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name } }) => {
              return (
                <Input 
                  id={"name"} 
                  type={"text"} 
                  value={value} 
                  name={name} 
                  label={"Nome"} 
                  stylesLabel={"label-register"} 
                  stylesInput={"input-register"} 
                  stylesError={undefined} 
                  isPassword={false} 
                  ariaLabel={"Nome"} 
                  error={false} 
                  errorMsg={""}
                  onChange={onChange}
                  onBlur={onBlur}                 
                />
              )
            }}
          />

          <Controller 
            name='cpf'
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name } }) => {
              return (
                <Input 
                  id={"cpf"} 
                  type={"number"} 
                  value={value} 
                  name={name} 
                  label={"CPF"} 
                  stylesLabel={"label-register"} 
                  stylesInput={"input-register"} 
                  stylesError={undefined} 
                  isPassword={false} 
                  ariaLabel={"cpf"} 
                  error={false} 
                  errorMsg={""}
                  onChange={onChange}
                  onBlur={onBlur}             
                />
              )
            }}
          />    

          <Controller 
            name='dateOfBirth'
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name } }) => {
              return (
                <Input 
                  id={"dateOfBirth"} 
                  type={"date"} 
                  value={value} 
                  name={name} 
                  label={"Data de Nascimento"} 
                  stylesLabel={"label-register"} 
                  stylesInput={"input-register"} 
                  stylesError={undefined} 
                  isPassword={false} 
                  ariaLabel={"data De Nascimento"} 
                  error={false} 
                  errorMsg={""}
                  onChange={onChange}
                  onBlur={onBlur}                 
                />
              )
            }}
          />

          <Typography
            variant="h4"
            component="h4"
            sx={{ 
              fontSize: { xs: '0.8rem', md: '1.2rem' }, 
              mt: 3,
              mb: 2, 
              fontWeight: 'bold' 
            }}
          >
            Qual é o número do seu celular?
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: { xs: "0.8rem", md: "1rem" }, 
              mt: 1,
            }}
          >
            Para utilizar nossos serviços precisamos validar seu celular.
          </Typography>

          <Controller 
            name='cellPhone'
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name } }) => {
              return (
                <Input 
                  id={"cellPhone"} 
                  type={"number"} 
                  value={value} 
                  name={name} 
                  label={"Celular"} 
                  stylesLabel={"label-register"} 
                  stylesInput={"input-register"} 
                  stylesError={undefined} 
                  isPassword={false} 
                  ariaLabel={"Celular"} 
                  error={false} 
                  errorMsg={""}
                  onChange={onChange}
                  onBlur={onBlur}                 
                />
              )
            }}
          />  

          <Controller 
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, name } }) => {
                return (
                  <Input 
                    id={"email"} 
                    type={"text"} 
                    value={value} 
                    name={name} 
                    label={"E-mail"} 
                    stylesLabel={"label-register"} 
                    stylesInput={"input-register"} 
                    stylesError={undefined} 
                    isPassword={true} 
                    ariaLabel={"E-mail"} 
                    error={false} 
                    errorMsg={""}
                    onChange={onChange}
                    onBlur={onBlur}                 
                  />
                )
              }}
            />

          <Controller 
              name='password'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, name } }) => {
                return (
                  <Input 
                    id={"password"} 
                    type={"text"} 
                    value={value} 
                    name={name} 
                    label={"Senha"} 
                    stylesLabel={"label-register"} 
                    stylesInput={"input-register"} 
                    stylesError={undefined} 
                    isPassword={true} 
                    ariaLabel={"Senha"} 
                    error={false} 
                    errorMsg={""}
                    onChange={onChange}
                    onBlur={onBlur}                 
                  />
                )
              }}
            />

          <FormGroup sx={{ mt: 0.2, mb: 1 }}>
            <FormControlLabel 
              control={<Checkbox />} 
              label={
                <Typography 
                  sx={{ 
                    fontSize: { xs: "0.8rem", md: "1rem" }
                  }}
                >
                  Li e aceito os <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer"><b>Termos de Uso</b></a> e o <a href="/aviso-de-privacidade" target="_blank" rel="noopener noreferrer"><b>Aviso de Privacidade</b></a>
                </Typography>
              } 
            />
          </FormGroup>

          <Box>
            <ButtonRegister
              type="submit" 
              fullWidth
              variant="contained" 
              disabled={!isValid}
              onClick={() => {}}
              sx={{
                mt: 2,
                borderRadius: 0,
                border: 'none',
                backgroundColor: isValid ? '#B76E79' : '#e0e0e0',
                color: isValid ? 'white' : '#888',
                cursor: !isValid ? 'not-allowed' : 'pointer',
                pointerEvents: 'auto',
                '&:hover': {
                  cursor: !isValid ? 'not-allowed' : 'pointer',
                  pointerEvents: 'stroke',
                  backgroundColor: isValid ? '#a15c66' : '#e0e0e0',
                },
              }}
            >
              Cadastrar
            </ButtonRegister>
          </Box>
        </form>
      </Box>
    </Box>
  );
};


export default Register;


