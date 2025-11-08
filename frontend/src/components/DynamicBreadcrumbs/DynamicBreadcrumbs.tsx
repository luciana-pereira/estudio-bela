import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs, Typography, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './DynamicBreadcrumbs.css'

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const DynamicBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x); // Divide a URL em partes

  const breadcrumbs = pathnames.map((value, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`; // ConstrÃ³i o caminho dinÃ¢mico
    const isLast = index === pathnames.length - 1;

    return isLast ? (
      <Typography 
        key={index} 
        color="text.primary" 
        sx={{ 
          fontSize: {
            xs: '1.2rem',
            sm: '1rem',
            md: '1.4rem',
          }, 
        }} 
        className="custom-link-breadcrumbs">
        {capitalizeFirstLetter(value)}
      </Typography>
    ) : (
      <Link className="custom-link-breadcrumbs" key={index} to={routeTo}>
        {capitalizeFirstLetter(value)}
      </Link>
    );
  });

  return (
  <Stack mt={2} spacing={2}>
    <Breadcrumbs
      sx={{ 
        fontSize: {
          xs: '1.2rem',
          sm: '1rem',
          md: '1.4rem',
        },

        flexWrap: 'wrap',
      }}
      separator={<NavigateNextIcon 
      sx={{ 
        fontSize: {
          xs: '1.2rem',
          sm: '1rem',
          md: '1.4rem',
        }, 
      }} />}
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>
  </Stack>
  );
}

export default DynamicBreadcrumbs;