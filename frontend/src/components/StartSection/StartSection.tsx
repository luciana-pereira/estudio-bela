import React, { useRef } from "react";
import styled from '@emotion/styled';
import { Box, Grid, IconButton } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoEstudioBela from "../../assets/img/EstudioBela.png";
import WomanHair from "../../assets/img/woman-hair.png";
import Penteado from "../../assets/img/penteado-feminino.png";
import FraseEstudioBela from "../../assets/img/frase.png";


const StyledCircleLeft = styled('img')<{ size: number }>(({ size }) => ({
  width: size,
  height: size,
  borderRadius: '20%',
  // borderTopLeftRadius: '50%',
  // borderTopRightRadius: '50%',
  // borderBottomLeftRadius: '50%',
  // borderBottomRightRadius: '50%',
  borderBottom: '1px solid #242020',
  borderLeft: '1px solid #242020',
  padding: '5px',
  objectFit: 'cover',
}));

const StyledCircleRight = styled('img')<{ size: number }>(({ size }) => ({
  width: size,
  height: size,
  borderRadius: '20%',
  // borderTopLeftRadius: '50%',
  // borderTopRightRadius: '50%',
  // borderBottomRightRadius: '50%',
  // borderBottomLeftRadius: '50%',
  borderRight: '1px solid #242020',
  borderBottom: '1px solid #242020',
  padding: '5px',
  objectFit: 'cover',
}));

const StartSection = () => {

  const secondSectionRef = useRef<HTMLElement | null>(null);

  const scrollToSecondSection = () => {
    if (secondSectionRef.current) {
      secondSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // <Grid
    // container
    // sx={{
    //     height: "90vh !important",
    //     position: 'relative',
    // }}
    // >
        <Grid 
          size={{ xs: 12, sm:5, md: 6 }} 
          sx={{ 
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center", 
            paddingBottom: '10%' 
          }}>
            <img
            src={LogoEstudioBela}
            alt="Logo Estudio Bela"
            style={{
                maxWidth: "100%",
                objectFit: "contain",
                // borderRadius: '50%',
                // borderRight: '1px solid #242020',
                // borderTop: '1px solid #242020',
                // padding: '0.5px',
            }}
            />
            <img
            src={FraseEstudioBela}
            alt="frase contendo: Um espaço feito para você se sentir linda, leve e confiante"
            style={{
                maxWidth: "100%",
                minHeight: "65px",
                objectFit: "contain",
                marginTop: 20
            }}
            />
            <Box>
                <IconButton  onClick={scrollToSecondSection} >
                    <ExpandMoreIcon fontSize="large" sx={{ color: "#5F3D41", marginTop: '0px'}} />
                </IconButton>
            </Box>
        {/* </Grid> */}

        {/* <Grid 
            size={{ xs: 12, md: 6 }} 
            sx={{ paddingTop: '4%' }}
        >
            <Box display="flex" justifyContent="center" alignItems="center" gap={4} >
                <StyledCircleLeft src={WomanHair} size={450} />
                <Grid sx={{ paddingTop: '15%' }}>
                    <StyledCircleRight src={Penteado} size={350} />
                </Grid>
            </Box>
        </Grid> */}
    </Grid>
  )
}

export default StartSection;