import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import styled from '@emotion/styled';
import 'uikit/dist/css/uikit.min.css'; 
import logo from '../images/logopaca.png';
import LoginModal from './LoginModal'; 
import Tooltip from './Tooltip'; 
import { useCart } from '../context/CartContext';

const NavbarContainer = styled.nav`
  background-color: #000000; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const NavbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; 
  padding: 0 1rem;
  transition: opacity 0.6s ease, transform 0.6s ease;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  color: #fff; 
  margin-right: 1rem;
`;

const Logo = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const BrandName = styled(Link)`
  font-size: 24px; 
  font-weight: bold; 
  color: #fff; 
  text-decoration: none; 

  &:hover {
    color: #fff; 
    text-decoration: none; 
  }
`;

const HighlightedLetter = styled.span`
  color: #ff0000; 
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  margin: 15px auto;

  input {
    border-radius: 20px;
    padding: 0.5rem;
    border: 1.5px solid #FF0000; 
    width: 450px;
    height: 20px;
    margin-left: 0.5rem;
    background-color: #E5E5E5; 
    outline: none;

    &:focus {
      border-color: #FF0000;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;

  svg {
    margin: 0 10px;
    color: #fff; 
    border-radius: 30%;
    padding: 5px;
    height: 35px;
    width: 35px;
    transition: color 0.3s ease;

    &:hover {
      color: #FF0000; 
    }
  }
`;

const DropdownButtonContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  background-color: #000000;
  color: #fff;
  border: none;
  height: 30px;
  border-radius: 2px;
  margin-right: 120px;
  cursor: pointer;
  transition: color 0.3s ease;
  line-height: 30px;
  position: relative;

  &:hover {
    color: #FF0000;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: 100%;
    background-color: #FF0000;
    transform: scaleX(0);
    transition: transform 0.5s ease;
  }

  &:hover::after {
    transform: scaleX(1); 
  }
`;

const DropdownMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute; 
  background-color: #000000;
  border: 1px solid #FF0000;
  border-radius: 10px;
  top: 100%; 
  left: 0;
  margin-top: 5px;
  width: 150px;
  z-index: 100;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #FF0000;
    text-decoration: none;
  }
`;

const MenuItem = styled(Link)`
  display: block;
  padding: 10px;
  color: #fff;
  text-decoration: none; 
  background-color: transparent; 
  cursor: pointer;

  &:hover {
    background-color: #FF0000; 
    color: #fff; 
    text-decoration: none; 
  }
`;

const DropdownUserMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #000000;
  border: 1px solid #FF0000;
  border-radius: 10px;
  top: 100%; 
  right: 0;
  margin-top: -70px;
  width: 200px;
  z-index: 100;
`;

const UserMenuItem = styled.div`
  padding: 10px;
  color: #fff;
  text-decoration: none; 
  background-color: transparent; 
  cursor: pointer;

  &:hover {
    background-color: #FF0000; 
    color: #fff; 
    text-decoration: none; 
  }
`;

const Navbar = () => {
  const [showSearchRow, setShowSearchRow] = useState(true);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [scrolling, setScrolling] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [rol, setRol] = useState(null); // ✅ ¡Agregado para corregir el error!

  useEffect(() => {
    const token = localStorage.getItem('token');
    const nombre = localStorage.getItem('nombre');
    const rolUsuario = localStorage.getItem('rol');
    if (token) {
      setIsAuthenticated(true);
      setNombreUsuario(nombre);
      setRol(rolUsuario); // ✅ Actualiza el estado con el rol
    }
  }, []);

  const { totalItems } = useCart();


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('nombre');
      localStorage.removeItem('rol');
      setRol(null); // Limpiar el rol al cerrar sesión
    } else {
      setShowLogin(true);
    }
  };

  const closeLoginModal = () => {
    setShowLogin(false);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <NavbarContainer>
      <NavbarRow
        style={{
          opacity: showSearchRow || isScrollingUp ? 1 : 0,
          transform: showSearchRow || isScrollingUp ? 'translateY(0)' : 'translateY(-100%)',
          height: showSearchRow || isScrollingUp ? 'auto' : '0',
          overflow: 'hidden'
        }}
      >
        <div className="uk-navbar-left">
          <LogoContainer>
            <Logo src={logo} alt="Logo" />
            <BrandName to="/" onClick={scrollToTop}>
              <HighlightedLetter>P</HighlightedLetter>acande
            </BrandName>
          </LogoContainer>
        </div>
        <SearchContainer>
          <span uk-icon="icon: search" style={{ color: '#fff' }}></span>
          <input type="text" placeholder="Buscar..." />
        </SearchContainer>
        <ButtonContainer>
          <Tooltip text={isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}>
            {isAuthenticated ? (
              <span
                onClick={toggleUserMenu}
                style={{
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  padding: '5px 10px',
                }}
              >
                Hola, {nombreUsuario}
              </span>
            ) : (
              <FaUser size={24} onClick={handleUserClick} />
            )}
          </Tooltip>
          <Tooltip text="Carrito de compras">
  <Link to="/carrito" style={{ position: 'relative' }}>
    <FaShoppingCart size={24} style={{ color: 'white' }} />
    {totalItems > 0 && (
      <span style={{
        position: 'absolute',
        top: '-5px',
        right: '-10px',
        background: '#FF0000',
        color: 'white',
        borderRadius: '50%',
        padding: '2px 6px',
        fontSize: '12px',
        fontWeight: 'bold',
      }}>
        {totalItems}
      </span>
    )}
  </Link>
</Tooltip>

        </ButtonContainer>
      </NavbarRow>

      {userMenuOpen && (
        <DropdownUserMenu isOpen={userMenuOpen}>
          <UserMenuItem onClick={() => {
            handleUserClick();
            toggleUserMenu();
          }}>Cerrar sesión</UserMenuItem>
          <UserMenuItem onClick={() => {
            toggleUserMenu();
            window.location.href = '/perfil';
          }}>Perfil</UserMenuItem>
        </DropdownUserMenu>
      )}

      <NavbarRow
        style={{
          backgroundColor: scrolling ? 'rgba(0, 0, 0, 1)' : '#000000',
          padding: '10px 0',
          borderRadius: '0',
          opacity: scrolling ? 1 : 1
        }}
      >
        <DropdownButtonContainer>
          <DropdownButton onClick={toggleDropdown}>Categorías</DropdownButton>
          <DropdownMenu isOpen={dropdownOpen}>
            <MenuItem to="/ropa" onClick={() => setDropdownOpen(false)}>Ropa</MenuItem>
            <MenuItem to="/tecnologia" onClick={() => setDropdownOpen(false)}>Tecnología</MenuItem>
            <MenuItem to="/hogar" onClick={() => setDropdownOpen(false)}>Hogar</MenuItem>
            <MenuItem to="/deporte" onClick={() => setDropdownOpen(false)}>Deporte</MenuItem>
          </DropdownMenu>
        </DropdownButtonContainer>

        <DropdownButton>
          <StyledLink to="/ofertas">Ofertas</StyledLink>
        </DropdownButton>

        {rol === 'admin' && (
          <>
            <DropdownButton>
              <StyledLink to="/admin">Usuarios</StyledLink>
            </DropdownButton>

            <DropdownButton>
              <StyledLink to="/products">Productos</StyledLink>
            </DropdownButton>
          </>
        )}
      </NavbarRow>

      {showLogin && <LoginModal onClose={closeLoginModal} />}
    </NavbarContainer>
  );
};

export default Navbar;
