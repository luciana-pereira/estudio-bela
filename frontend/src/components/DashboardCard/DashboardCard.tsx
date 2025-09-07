import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactElement;
  route: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  route,
}) => {
  const navigate = useNavigate();

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card
        sx={{
          height: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "white",
          background: 'linear-gradient(140deg, #D7C4A1 2%, #864A4A 83%)',
        }}
      >
        <CardActionArea 
          onClick={() => navigate(route)}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <CardContent>
            {/* <Box display="flex" alignItems="center" gap={2}> */}
              <Box 
                sx={{
                  mb: 1,
                  display: 'flex',
                  flexDirection: "column",
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  // height: 100,                  
                  borderRadius: '50%',
                  // background: 'linear-gradient(140deg, #D7C4A1 2%, #864A4A 83%)'
                }}
              >
                {icon}
              </Box>

              {/* <Box> */}
                <Typography variant="h6" align="center">{title}</Typography>
                <Typography variant="body2" color="white" align="center">
                  {description}
                </Typography>
              {/* </Box> */}
            {/* </Box> */}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default DashboardCard;
