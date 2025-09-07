import { Box, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


interface ServiceCardProps {
  title: string;
  image: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const ServiceCard = ({ title, image }: ServiceCardProps) => {
  return (
    <Item
      sx={{

        paddingTop: '66.66%',
        backgroundImage: `url(${image})`,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          color: '#fff',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
        }}
      >
        {title}
      </Typography>
    </Item>
  );
};

export default ServiceCard;
