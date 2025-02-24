import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useEffect, useState } from 'react';
import PreferenceMP from '../../../types/mercadopago/PreferenceMP';
import { createPreferenceMP } from '../../../service/BackendClient';
import Pedido from '../../../types/Pedido';
import { Button } from '@mui/material';
import './CheckoutMP.css';

interface CheckoutMPProps {
  montoCarrito: number;
}

const CheckoutMP: React.FC<CheckoutMPProps> = ({ montoCarrito }) => {
  const [idPreference, setIdPreference] = useState<string>('');

  const getPreferenceMP = async () => {
    if (montoCarrito > 0) {
      const pedido = new Pedido();
      pedido.fechaPedido = new Date();
      pedido.totalPedido = montoCarrito;
      
      const response: PreferenceMP = await createPreferenceMP(pedido);
      console.log("Preference id: " + response.id);
      if (response) {
        setIdPreference(response.id);
      }
    } else {
      alert("Agregue al menos un instrumento al carrito");
    }
  };

  useEffect(() => {
    initMercadoPago('TEST-5b58b558-60aa-484c-8fff-a76c3e78d96a', { locale: 'es-AR' });
  }, []);

  return (
    <div>
      {!idPreference && (
        <Button onClick={getPreferenceMP} variant="contained" color="primary" className='btMercadoPago'>
          COMPRAR con Mercado Pago
        </Button>
      )}
      <div className={idPreference ? 'divVisible' : 'divInvisible'}>
        {idPreference && <Wallet initialization={{ preferenceId: idPreference, redirectMode: "blank" }} customization={{ texts: { valueProp: 'smart_option' } }} />}
      </div>
    </div>
  );
};

export default CheckoutMP;
