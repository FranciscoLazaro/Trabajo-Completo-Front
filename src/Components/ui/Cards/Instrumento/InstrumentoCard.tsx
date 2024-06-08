import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';
import { AddShoppingCart as AddShoppingCartIcon } from '@mui/icons-material';
import CartInstrumento from '../../../../types/CartInstrumento';
import { useAuth } from '../../../../contexts/AuthContext';

interface InstrumentoCardProps {
  instrumento: CartInstrumento;
  onAddToCart: (instrumento: CartInstrumento) => void;
}

const InstrumentoCard: React.FC<InstrumentoCardProps> = ({ instrumento, onAddToCart }) => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();
  const { instrumento: nombreInstrumento, marca, modelo, imagen, precio, descripcion } = instrumento;

  const showAddToCartButton = isAuthenticated && userRole !== 'ADMIN' && userRole !== 'OPERADOR';

  const handleCardClick = () => {
    navigate(`/detalles/${instrumento.id}`);
  };

  return (
    <Card 
      sx={{ display: 'flex', backgroundColor: '#ecd9af', color: '#4a2e0b', cursor: 'pointer' }} 
      onClick={handleCardClick}
    >
      <Box sx={{ width: '40%', position: 'relative' }}>
        <img src={imagen} alt={nombreInstrumento} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
        <CardContent sx={{ flexGrow: 1, backgroundColor: '#f5deb3' }}>
          <Typography variant="h6">{nombreInstrumento}</Typography>
          <Typography variant="body2" color="textSecondary">{descripcion}</Typography>
          <Typography variant="body1" gutterBottom>${precio}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }} onClick={(e) => e.stopPropagation()}>
          {showAddToCartButton && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => onAddToCart(instrumento)}
              sx={{ 
                backgroundColor: '#4a2e0b', 
                color: '#fff',
                minWidth: 'auto',
                p: 0.5,
                '& .MuiButton-startIcon': {
                  m: 0
                }
              }}
              startIcon={
                <Box 
                  component="span"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    borderRadius: '50%', 
                    width: 24, 
                    height: 24, 
                    backgroundColor: '#fff', 
                    color: '#4a2e0b'
                  }}
                >
                  <AddShoppingCartIcon fontSize="small" />
                </Box>
              }
            />
          )}
        </CardActions>
      </Box>
    </Card>
  );
};

export default InstrumentoCard;
