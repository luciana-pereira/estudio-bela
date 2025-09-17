import { Box, Grid, Typography } from '@mui/material';
import CorteMasculino from '../../assets/img/corte-masculino.png'
import Penteado1 from '../../assets/img/penteado-feminino.png'
import Penteado2 from '../../assets/img/penteado-feminino2.png'
import Penteado3 from '../../assets/img/penteado-feminino1.png'
import Corte1 from '../../assets/img/corte-feminino.png'
import Corte2 from '../../assets/img/woman-hair.png'
import Servicos from "../../assets/img/Nossos-Servicos.png";

const imageItems = [
  {
    img: Penteado1,
    height: '500px',
    label: 'Penteados',
    description: 'Penteados para festas, casamentos e eventos especiais.',
  },
  {
    img: CorteMasculino,
    height: '500px',
    label: 'Corte Masculino',
    description: 'Cortes modernos, clássicos e personalizados.',
  },
  {
    img: Corte1,
    height: '500px',
    label: 'Corte Feminino',
    description: 'Cortes para todos os estilos e formatos de rosto.',
  },
  {
    img: Corte2,
    height: '500px',
    label: 'Coloração / Tintura',
    description: 'Coloração total, mechas, luzes e tonalizações.',
  },
  {
    img: Penteado2,
    height: '500px',
    label: 'Penteados',
    description: 'Tranças, coques e penteados criativos para o dia a dia.',
  },
  {
    img: Penteado3,
    height: '500px',
    label: 'Tratamentos Capilares',
    description: 'Hidratação, nutrição, reconstrução e muito mais.',
  },
];

// export interface ServicesProps {
//   ref: React.MutableRefObject<HTMLElement | null>;
// }

// const Services: React.FC<ServicesProps> =({ ref }) => {
const Services =() => {

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        px: 4, 
        pb: 4, 
        my: 10,
      }}
      // ref={ref}
    >
      <Box 
        sx={{ 
          justifyContent: 'center', 
          display: 'flex'
        }}
      >
        <img
          src={Servicos}
          alt="Nossos Servi�os"
          style={{
            width: "24%",
            marginBottom: '40px',
          }}
        />
      </Box>
      <Typography sx={{ my:4, mx: 4, fontSize: { xs: "0.9rem", md: "1.3rem" }, color: '#242020' }}>
        Nossos serviços são pensados para oferecer a você mais do que um simples cuidado com a aparência — buscamos proporcionar momentos de autoestima, relaxamento e transformação.
        Nossa equipe é formada por profissionais experientes e atualizados com as últimas tendências em beleza e bem-estar. Utilizamos produtos de alta qualidade e técnicas modernas 
        para garantir resultados incríveis em cada atendimento.
      </Typography>
      <Typography sx={{ m: 4, fontSize: { xs: "0.9rem", md: "1.3rem" }, color: '#242020' }}>
        Seja para um corte renovador, uma coloração personalizada ou aquele penteado especial para um evento importante, temos o serviço ideal para cada ocasião.
        Também oferecemos tratamentos capilares que nutrem, fortalecem e recuperam a saúde dos fios, garantindo que você saia do salão sentindo-se ainda mais confiante, 
        leve e satisfeita.
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
                height: '500px', 
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

export default Services;
