import { Container, Divider } from "@mui/material";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Services from "../components/Services/Services";
import Team from "../components/Team/Team";
import Enterprise from "../components/Enterprise/Enterprise";
import StartSection from "../components/StartSection/StartSection";
import FooterSection from "../components/FooterSection/FooterSection";
import "../css/pages/Home.css";

const Home: React.FC = () => {

  return (
    <Container 
      component="main" 
      className="home-page" 
      maxWidth="xl" 
      sx={{background: 'linear-gradient(140deg, #D7C4A1 2%, #864A4A 83%)',}}
    >
      <NavBar />
      <StartSection />
      <Divider />
      <Services />
      <Divider />
      <Team />
      <Divider />
      <Enterprise />
      <Divider />
      <FooterSection />
      <Footer />
    </Container>
  );
};

export default Home;

