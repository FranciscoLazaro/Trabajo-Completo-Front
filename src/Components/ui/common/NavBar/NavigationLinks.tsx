import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import { useAuth } from '../../../../contexts/AuthContext';
import { useCart } from '../../../../contexts/CartContext';
import CartInstrumento from '../../../../types/CartInstrumento';
import { styled } from '@mui/material/styles';



const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  margin: '0 10px',
  '&:hover': {
    color: '#FFD700', // Gold color on hover
  },
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#000000', // Black color
});

const ToolbarContent = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start', // Ajustar elementos a la izquierda
  width: '100%',
});

const NavigationBar = () => {
  const { isAuthenticated, userRole } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { cart} = useCart();
  const navigate = useNavigate();

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <ToolbarContent>
          <IconButton
            component={Link}
            to="/"
            aria-label="Inicio"
            color="inherit"
          >
            <Typography variant="body1">INICIO</Typography>
          </IconButton>
          {isAuthenticated && (userRole === 'ADMIN' || userRole === 'OPERADOR') && (
            <>
             
              <IconButton
                component={Link}
                to="/instrumentos"
                aria-label="Instrumentos"
                color="inherit"
              >
                <Typography variant="body1">INSTRUMENTOS</Typography>
              </IconButton>
            </>
          )}
          {isAuthenticated && userRole === 'ADMIN' && (
            <IconButton
              component={Link}
              to="/estadisticas"
              aria-label="Estadísticas"
              color="inherit"
            >
              <Typography variant="body1">ESTADISTICAS</Typography>
            </IconButton>
          )}
        </ToolbarContent>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavigationBar;
