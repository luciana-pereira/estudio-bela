import { Box, Grid, Typography } from '@mui/material';
import QuemSomos from "../../assets/img/Quem-somos.png";

const items = [
  {
    height: '500px',
    label: 'Atendimento Personalizado',
    description: 'Escutamos você com atenção, serviços adaptados ao seu estilo, experiência única a cada visita.',
  },
  {
    height: '500px',
    label: 'Nossa Essência',
    description: 'Acreditamos que beleza é expressão, espaço acolhedor com profissionais apaixonados, ambiente sofisticado, técnicas atualizadas e amor em cada detalhe.',
  },
  {
    height: '500px',
    label: 'Excelência Profissional',
    description: 'Profissionais certificados, tendências e inovação e compromisso com qualidade.',
  },
];

const Enterprise =() => {

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
          src={QuemSomos}
          alt="Quem Somos - Estúdio de Beleza"
          style={{
            width: "24%",
            marginBottom: '40px',
          }}
        />
      </Box>
      <Typography sx={{ my:4, mx: 4, fontSize: { xs: "0.9rem", md: "1.3rem" }, color: '#242020' }}>
        Fundada em 2019 por Mariah, o Estúdio Bela foi criado para oferecer serviços
        exclusivos e personalizados a todo o público. Inspirada no estilo moderno, nosso estúdio
        combina um ambiente minimalista e sofisticado, onde proporcionamos a
        cada cliente cuidados personalizados.
      </Typography>
      <Typography sx={{ m: 4, fontSize: { xs: "0.9rem", md: "1.3rem" }, color: '#242020' }}>
        Oferecemos uma variedade de serviços, como cortes de cabelo, tintura, sobrancelha, escova
        progressiva e hidratação. Atendimento especializado com boa música e experiência única e acolhedora. Venha viver 
        o cuidado e a excelência que você merece!
      </Typography>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid 
            key={index} 
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{ perspective: '1000px' }}
          >
            <Box 
              sx={{
                position: 'relative',
                width: '100%',
                height: '500px',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.6s',
                '&:hover': {
                  transform: 'rotateY(180deg)',
                },
              }}
            >
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
                  textAlign: 'center',
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
                  backgroundColor: '#864A4A',
                  backgroundSize: 'cover',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  transform: 'rotateY(180deg)',
                  textAlign: 'center',
                  boxShadow: 4,
                }}
              >
                <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", md: "1.3rem" } }}>
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

export default Enterprise;
