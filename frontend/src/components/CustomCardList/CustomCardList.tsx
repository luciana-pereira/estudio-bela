import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem 
} from '@mui/material';

interface CustomCardListProps {
    title: string;
    listItems: string[];
    fontColor: string;
    BgColor: string;
}

const CustomCardList: React.FC<CustomCardListProps> = ({ title, listItems, fontColor,  BgColor}) => {
  return (
    <Box 
      sx={{ 
        minWidth: 275, 
        margin: "5px 10px",
        display: 'flex',
        justifyContent: 'center',
        cursor: "pointer"
      }}
    >      
      <Card sx={{ 
          width: 'auto', 
          height: 'auto',
          borderRadius: "30px",
          padding: "20px",
          boxShadow: "0px 2px 4px -1px rgb(78 69 69 / 20%), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)", 
          color: fontColor, 
          background: BgColor,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontSize: { xs: "0.9rem", md: "1.3rem" }, fontWeight: 'bold' }}>
            {title}
          </Typography>
          <List sx={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            {listItems.map((item, index) => (
              <ListItem 
                key={index} 
                sx={{
                  display: 'list-item !important',
                  padding: '3.2px !important' 
                }}
              >
                <Typography variant="body2" sx={{  fontSize: "1.2rem" }}>{item}</Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CustomCardList;
