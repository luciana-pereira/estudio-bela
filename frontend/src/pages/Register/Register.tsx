import React, { FormEvent } from 'react';
import { Controller, useForm, SubmitHandler } from "react-hook-form";
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

const Register = () => {

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors
  } = useForm<RegisterFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      cpf: '',
      dateOfBirth: '',
      cellPhone: '',
      email: '',
      password: '',
    },
  });

  const validateForm = (data: RegisterFormData) => {
    let isValid = true;

    if (!data.name) {
      setError('name', { message: 'Nome é obrigatório' });
      isValid = false;
    } else {
      clearErrors('name');
    }

    if (!data.cpf) {
      setError('cpf', { message: 'CPF é obrigatório' });
      isValid = false;
    } else if (!/^\d{11}$/.test(data.cpf)) {
      setError('cpf', { message: 'CPF deve conter 11 dígitos' });
      isValid = false;
    } else {
      clearErrors('cpf');
    }

    if (!data.dateOfBirth) {
      setError('dateOfBirth', { message: 'Data de nascimento é obrigatória' });
      isValid = false;
    } else {
      clearErrors('dateOfBirth');
    }

    if (!data.cellPhone) {
      setError('cellPhone', { message: 'Número de celular é obrigatório' });
      isValid = false;
    } else if (!/^\d{11}$/.test(data.cellPhone)) {
      setError('cellPhone', { message: 'Celular deve conter 11 dígitos' });
      isValid = false;
    } else {
      clearErrors('cellPhone');
    }

    if (!data.email) {
      setError('email', { message: 'E-mail é obrigatório' });
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      setError('email', { message: 'E-mail inválido' });
      isValid = false;
    } else {
      clearErrors('email');
    }

    if (!data.password) {
      setError('password', { message: 'Senha é obrigatória' });
      isValid = false;
    } else if (data.password.length < 6) {
      setError('password', { message: 'Senha deve ter no mínimo 6 caracteres' });
      isValid = false;
    } else {
      clearErrors('password');
    }

    return isValid;
  };

  const onSubmit: SubmitHandler<RegisterFormData> = async (data: RegisterFormData) => {
    if (!validateForm(data)) return;

    console.log('Dados do formulário:', data);

    const API_URL = "https://estudio-bela.vercel.app";

    try {
      const response = await fetch(`${API_URL}/users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          username: data.name,
          password: data.password,  
          role: 2,
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
        // overflow: "hidden",
        overflowY: "auto",
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
          // overflowY: "auto",
          height: "100vh",
        }}
      >
        <DynamicBreadcrumbs />
        {/* <Box sx={{ textAlign: "center" }}>
          <img 
            src={LogoEstudioBela}
            style={{
              padding: "5px",
              width: "70%",
              maxWidth: "270px",
            }} 
            alt="Logo contendo as palavras Estúdio de Bela." 
          />
        </Box> */}

        <Typography
          component="p"
          sx={{
            fontSize: { xs: "0.9rem", md: "1.2rem" },
            mt: 2,
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
                  error={!!errors.name} 
                  errorMsg={errors.name?.message || ''}
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
                  error={!!errors.cpf} 
                  errorMsg={errors.cpf?.message || ''}
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
                  error={!!errors.dateOfBirth} 
                  errorMsg={errors.dateOfBirth?.message || ''}
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
                  error={!!errors.cellPhone} 
                  errorMsg={errors.cellPhone?.message || ''}
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
                    isPassword={false} 
                    ariaLabel={"E-mail"} 
                    error={!!errors.email} 
                    errorMsg={errors.email?.message || ''}
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
                    error={!!errors.password} 
                    errorMsg={errors.password?.message || ''}
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
