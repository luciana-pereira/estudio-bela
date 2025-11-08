import React from "react";
import './Footer.css';
import logo from '../../assets/img/logo-preta-estudio-bela.png';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <p>&copy;</p>
            <img src={logo} alt="Logo Estúdio Bela" className="footer-logo" />
            <p> 2025 - Todos os direitos reservados.</p>
        </footer>
    );
};

export default Footer;
