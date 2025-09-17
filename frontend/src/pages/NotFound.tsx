import { Box } from "@mui/material";
import ImgNotFound from "../assets/img/404.png";

const NotFound = () => {
  return (
    <Box 
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight:"80vh",
        p: 2,
      }}
    >
      <Box
        component="img"
        src={ImgNotFound}
        alt="Mulher com cabelos ao vento"
        sx={{
          width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
          height: "auto",
          borderRadius: "10px",
        }}
      />
    </Box>
  );
};

export default NotFound;
