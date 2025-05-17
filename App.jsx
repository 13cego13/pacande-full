// frontend/src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import AdminPage from "./pages/AdminPage"; // Importa la página de administración
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import ActualizarUsuarioPage from "./pages/ActualizarUsuarioPage"; // Importa la página de actualización de usuario
import ErrorPage from "./pages/ErrorPage";
import TermsPage from "./pages/TermsPage"; // Importa la página de Términos
import PrivacyPage from "./pages/PrivacyPage"; // Importa la página de Privacidad
import HelpPage from "./pages/HelpPage"; // Importa la página de Ayuda
import RopaPage from "./pages/RopaPage"; // Importa la página de Ropa
import TecnologiaPage from "./pages/TecnologiaPage"; // Importa la página de Tecnología
import HogarPage from "./pages/HogarPage"; // Importa la página de Hogar
import DeportePage from "./pages/DeportePage"; // Importa la página de Deporte
import VariedadPage from "./pages/VariedadPage";
import PerfilPage from "./pages/PerfilPage";
import BaloncestoPage from "./pages/BaloncestoPage";
import DecoraPage from "./pages/DecoraPage";
import GardenPage from "./pages/GardenPage";
import styled from "@emotion/styled";
import logopaca from "./images/logopaca.png";
import RopaMujer from "./pages/Ropamujer";
import RopaNiñoPage from "./pages/Ropanino";
import Tecnologiacomputadores from "./pages/Tecnologiacomputadores";
import Tecnologiaaccesorios from "./pages/Tecnologiaaccesorios";
import OfertaPage from "./pages/OfertasPage";
import ProductPage from "./pages/ProductPage";
import CreateProductPage from "./pages/CreateProductPage";
import ShipmentList from "./components/ShipmentList";

// Estilos para la pantalla de carga
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  position: relative;
`;

const Logo = styled.img`
  width: 80px;
  height: 60px;
  z-index: 10;
`;

const CircleLoader = styled.div`
  position: absolute;
  border: 4px solid transparent;
  border-top: 4px solid #ff0000;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;
  z-index: 5;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const loadResources = () =>
      new Promise((resolve) => setTimeout(() => resolve(), 1000));

    setLoading(true);

    Promise.all([loadResources()]).then(() => {
      setLoading(false);
    });
  }, [location]);

  if (loading) {
    return (
      <LoaderContainer>
        <Logo src={logopaca} alt="Logo de la página" />
        <CircleLoader />
      </LoaderContainer>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} /> {/* Ruta de Términos */}
        <Route path="/privacy" element={<PrivacyPage />} />{" "}
        {/* Ruta de Privacidad */}
        <Route path="/help" element={<HelpPage />} /> {/* Ruta de Ayuda */}
        <Route path="/ropa" element={<RopaPage />} /> {/* Ruta para Ropa */}
        <Route path="/Ropamujer" element={<RopaMujer />} />
        <Route path="/Tecpc" element={<Tecnologiacomputadores />} />
        <Route path="/Ropaniño" element={<RopaNiñoPage />} />
        <Route path="/Decorapage" element={<DecoraPage />} />
        <Route path="/GardenPage" element={<GardenPage />} />
        <Route path="/VariedadPage" element={<VariedadPage />} />
        <Route path="/BaloncestoPage" element={<BaloncestoPage />} />
        <Route path="/HogarPage" element={<HogarPage />} />
        <Route path="/Tecaccesorios" element={<Tecnologiaaccesorios />} />
        <Route path="/tecnologia" element={<TecnologiaPage />} />{" "}
        {/* Ruta para Tecnología */}
        <Route path="/hogar" element={<HogarPage />} /> {/* Ruta para Hogar */}
        <Route path="/deporte" element={<DeportePage />} />{" "}
        {/* Ruta para Deporte */}
        <Route path="/ofertas" element={<OfertaPage />} />{" "}
        {/* Ruta para OfertaPage */}
        <Route path="*" element={<ErrorPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/admin/actualizar-usuario/:id"
          element={<ActualizarUsuarioPage />}
        />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />{" "}
        {/* Asegúrate de que el "element" esté correctamente asignado */}
      </Routes>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
