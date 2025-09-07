import { Box, Grid, Typography } from '@mui/material';
import Profissional from '../../assets/img/Profissional.png'
import Profissional1 from '../../assets/img/Profissional1.png'
import Profissional2 from '../../assets/img/Profissional2.png'
import Time from "../../assets/img/Time.png";

const imageItems = [
  {
    img: Profissional,
    height: '500px',
    label: 'Luca Andrade – Especialista em Corte Feminino',
    description: 'Com mais de 10 anos de experiência, Luca é referência em cortes modernos e tradicionais. Sua precisão e atenção aos detalhes o tornaram um dos profissionais mais requisitados por quem busca estilo e personalidade no visual. Além dos cortes, é expert em design e visagismo.',
  },
  {
    img: Profissional1,
    height: '500px',
    label: 'Camila Torres – Hair Stylist & Colorista',
    description: 'Apaixonada por tendências e transformação, Camila construiu uma carreira sólida como hairstylist ao longo de 12 anos. Especialista em coloração, mechas e penteados para eventos, ela combina técnica com sensibilidade artística para realçar a beleza única de cada cliente.',
  },
  {
    img: Profissional2,
    height: '500px',
    label: 'Renata Lima – Tratamentos Capilares & Terapia Capilar',
    description: 'Renata atua há mais de 8 anos no cuidado com a saúde dos fios e do couro cabeludo. Especialista em terapias capilares, hidratações profundas e reconstrução, ela é a profissional ideal para quem busca revitalizar os cabelos e recuperar sua vitalidade natural com atendimento acolhedor e personalizado.',
  }
];

const Team =() => {

  return (
    <Box
      sx={{
        flexGrow: 1,
        px: 4,
        pb: 4,
        my: 10,
      }}
    >
      <Box 
        sx={{ 
          justifyContent: 'center', 
          display: 'flex'
        }}
      >
        <img
          src={Time}
          alt="Equipe do salão de beleza"
          style={{
            width: "10%",
            marginBottom: '40px',
          }}
        />
      </Box>
      <Typography 
        sx={{ 
          my:4, mx: 4, 
          fontSize: { xs: "0.9rem", md: "1.3rem" }, 
          color: '#242020', 
          fontWeight: 'bold' 
        }}
      >
        Nosso time é formado por profissionais apaixonados por beleza, cuidado e transformação.
      </Typography>
      <Typography sx={{ m: 4, fontSize: { xs: "0.9rem", md: "1.3rem" }, color: '#242020' }}>
        Com experiência, técnica e dedicação, cada membro da equipe está comprometido em oferecer 
        um atendimento personalizado e de excelência, para que cada cliente viva uma experiência 
        única em nosso salão.
      </Typography>
      <Grid container spacing={2}>
        {imageItems.map((item, index) => (
          <Grid 
            key={index} 
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{ perspective: '1000px' }}
          >
            <Box 
              sx={{
                position: 'relative',
                width: '100%',
                height: '500px', // altura fixa
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s',
                '&:hover': {
                  transform: 'rotateY(180deg)',
                },
              }}
            >
              {/* Frente do Card */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: item.height,
                  backfaceVisibility: 'hidden',
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'flex-end',
                  boxShadow: 4,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    ml: 'auto',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    textAlign: 'right',
                    m: 2,
                    color: '#fff',
                  }}
                >
                  {item.label}
                </Typography>
              </Box>

              {/* Verso do Card */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: item.height,
                  backfaceVisibility: 'hidden',
                  backgroundColor: '#5F3D41',
                  backgroundSize: 'cover',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  transform: 'rotateY(180deg)',
                  textAlign: 'center',
                  boxShadow: 4
                }}
              >
                <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", md: "1.3rem" }, px: 4 }}>
                  {item.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Team;
