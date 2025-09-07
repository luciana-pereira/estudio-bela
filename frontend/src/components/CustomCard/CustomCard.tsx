import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./CustomCard.css"

interface CustomCardProps {
  image: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

const CustomCard: React.FC<CustomCardProps> = ({ image, title, subtitle, description, buttonText, onButtonClick }) => {
  return (
    <Box 
      sx={{ 
        minWidth: 275, 
        margin: "5px 10px",
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Card 
        variant="outlined" 
        sx={{ 
          width: 320,
          height: 350,
          borderRadius: "20px", 
          padding: "20px", 
          boxShadow: "0px 2px 4px -1px rgb(78 69 69 / 20%), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <CardContent sx={{ flex: 1, textAlign: 'center' }}>
          <Box sx={{justifyContent: 'center', display: 'flex'}}>
            {image}
          </Box>
          <Typography gutterBottom sx={{ color: '#B76E79', fontSize: { xs: "1.2rem", md: "1.3rem" }, fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="h5" component="div">
            {subtitle}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: { xs: "1rem", md: "1.2rem" } }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ paddingTop: '0px'}}>
          <Button size="small" sx={{ color: '#B76E79', fontSize: "1rem", fontWeight: 'bold' }} onClick={onButtonClick}>
            {buttonText}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default CustomCard;
