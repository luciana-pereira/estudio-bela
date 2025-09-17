import { useState, forwardRef } from "react";
import Input from '../../components/Forms/Input/Input';
import Button, { ButtonProps } from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Controller, useForm, useWatch } from "react-hook-form";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { blue } from "@mui/material/colors";
import LogoEstudioBela from '../../assets/img/logo-branca-estudio-bela.png';
import Ilustration from '../../assets/img/img-login.png';
import { styled } from "@mui/material/styles";
import DynamicBreadcrumbs from "../../components/DynamicBreadcrumbs/DynamicBreadcrumbs";
import { Box } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import "../../css/pages/Login.css";


const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isNavigate, setIsNavigate] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway')
      return;
    setOpen(false);
  };

  const onSubmit = async (formData: any) => {
    console.log(formData);
    const API_URL = "https://pi-mariah-estudio-back.onrender.com";

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          hashed_password: formData.password,
        }),
      });


      console.log(response);

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await response.json();
      const { access_token, token_type } = data;

      localStorage.setItem("authToken", access_token);
      
      const decoded: any = jwtDecode(access_token);
      const userId = decoded.id;

      const userResponse = await fetch(`${API_URL}/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error("Erro ao buscar dados do usuário");
      }

      const userData = await userResponse.json();

      localStorage.setItem("userData", JSON.stringify(userData));

      const roleId = userData.role_id;
      if (roleId === 1) {
        window.location.href = "/adm-dashboard";
      } else {
        window.location.href = "/dashboard";
      }

    } catch (error) {
      console.error("Erro ao autenticar:", error);
      setOpen(true); 
    }
  };


  const email = useWatch({
    control,
    name: "email",
  });

  const password = useWatch({
    control,
    name: "password",
  });

  const isDisabled = () => {
    if (
      email &&
      (password.length >= 6)
    ) {
      return false;
    } else {
      return true;
    }
  }  

  const ButtonLogin = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: "#B76E79",
    marginRight: "15px",
    fontWeight: "bold",
    textTransform: "none",
    fontSize: "1.2rem",
    "&:hover": {
      backgroundColor: 'rgb(224, 195, 199)' 
    },
  }));

  return (
    <Box
      component="section"
      aria-labelledby="form-container-login"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        justifyContent: "center",
        alignItems: "stretch",
        background: 'linear-gradient(140deg, #D7C4A1 2%, #864A4A 83%)'
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: { md: "50%", lg: "60%" },
          padding: "20px",
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img 
          src={Ilustration} 
          alt="Ilustração de uma mulher preenchendo a tela com os dados de usuario e senha para logar" 
          style={{
            maxWidth: "100%",
            height: "auto"
          }}
        />
      </Box>
      <Box 
        sx={{
          flex: 1,
          padding: { xs: "5% 5%", sm: "5% 10%", md: "2% 8%" },
          overflow: "auto"
        }}
      >
        {/* {isNavigate && (
          <Navigate to="dashboard" replace={true} />
        )} */}
        <Box>
          <DynamicBreadcrumbs />
          <Box mt={2} mb={3}>
            <img 
              src={LogoEstudioBela}
              alt="Logo"
              style={{
                padding: "20px",
                width: "40%",
                // maxWidth: "300px",
                margin: "0px auto",
                display: "flex",
                justifyContent: "center"
              }} 
            />
          </Box>
          <form
            onSubmit={handleSubmit(onSubmit)} 
            autoComplete="off"
          >
            <Controller
              name='email'
              control={control}
              render={({ field: { onChange, onBlur, value, name } }) => {
                return (
                  <Input
                    id={"email"}
                    type={"text"}
                    name={name}
                    label={"E-mail"}
                    stylesLabel={"label-login"}
                    stylesInput={"input-login"}
                    stylesError={undefined}
                    isPassword={false}
                    ariaLabel={"E-mail"}
                    value={value}
                    error={false}
                    errorMsg={"E-mail incorreto."}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                );
              }}
            />

            <Controller
              name='password'
              control={control}
              render={({ field: { onChange, onBlur, value, name } }) => {
                return (
                  <Input
                    id={"password"}
                    type={"password"}
                    name={name}
                    label={"Senha"}
                    stylesLabel={"label-login"}
                    stylesInput={"input-login form-control"}
                    stylesError={"error"}
                    isPassword={true}
                    ariaLabel={"Senha"}
                    value={value}
                    error={false}
                    errorMsg={"Senha incorreta ou numero de caracters invalido"}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                );
              }}
            />
            <ButtonLogin
              fullWidth
              variant="contained" 
              type="submit"
              style={{ fontSize: "1.3rem" }}
              disabled={isDisabled()}
              className={!isDisabled() ? "btn-container" : "btn-disable"}
              sx={{
                mt: 2,
                borderRadius: 0,
                border: 'none',
                backgroundColor: !isDisabled() ? '#5F3D41' : '#e0e0e0',
                color: !isDisabled() ? 'white' : '#888',
                '&:hover': {
                  backgroundColor: !isDisabled() ? '#a15c66' : '#e0e0e0',
                },
              }}
            >
              Acessar
            </ButtonLogin>

            <Link 
              className="custom-link"
              to="/inicio/login/cadastro"
              style={{fontSize: "1.2rem", color: 'white' }}
            >
              Não tem conta? <b>Cadastre-se</b>
            </Link>

            <Link
              className="custom-link"
              to="/inicio/login/resetar-senha"
              style={{fontSize: "1.2rem", color: 'white'}}
            >
              Perdeu a Senha?
            </Link>
          </form>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              E-mail ou senha incorreto!
            </Alert>
          </Snackbar>
        </Box>

      </Box>
    </Box>
  );
};

export default Login;