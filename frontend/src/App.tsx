import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./store/store";
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Scheduling from './pages/Scheduling';
import Messages from './pages/Messages';
import AdminDashboard from './pages/AdminDashboard';
import FinancialReport from './pages/FinancialReport/FinancialReport';
import ProfessionalSchedule from './pages/ProfessionalSchedule';
import RegisterProfessional from './pages/RegisterProfessional';
import StockControl from './pages/StockControl';
import React from 'react';
import AccessibilityMenu from './components/AccessibilityMenu'; 
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
        <AccessibilityMenu />
          <Routes>
            <Route path="/inicio" element={<Home />} />
            <Route path="/inicio/login" element={<Login />} />
            <Route path="/inicio/cadastro" element={<Register />} />
            <Route path="/inicio/login/cadastro" element={<Register />} />
            <Route path="/error" element={<NotFound />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inicio/login/dashboard" element={<Dashboard />} />
            <Route path="/agendamento" element={<Scheduling />} />
            <Route path="/avisos" element={<Messages />} />
            <Route path="/adm-dashboard" element={<AdminDashboard />} />
            <Route path="/financeiro" element={<FinancialReport />} />
            <Route path="/agenda" element={<ProfessionalSchedule />} />
            <Route path="/profissionais" element={<RegisterProfessional />} />
            <Route path="/estoque" element={<StockControl />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;