import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categoria from './Components/screens/Categoria/Categoria';
import Home from './Components/screens/Home/Home';
import Instrumento from './Components/screens/Instrumento/Instrumento';
import Estadisticas from './Components/screens/Estadisticas/Estadisticas';
import Navbar from './Components/ui/common/NavBar/NavBar';
import Login from './Components/screens/Login/Login';
import Register from './Components/screens/Register/Register';
import PrivateRoute from './Components/PrivateRoute';
import Detalles from './Components/screens/Detalles/Detalles';
import { useAuth } from './contexts/AuthContext';
import { useCart } from './contexts/CartContext';
import NotFound from './Components/screens/NotFound/NotFound';

const App: React.FC = () => {
  const { login, userRole } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    const authInfo = localStorage.getItem('authInfo');
    if (authInfo) {
      const { username, role, id } = JSON.parse(authInfo);
      login(username, role, id);
    }
  }, [login]);

  return (
    <Router>
      <div style={{ paddingBottom: '56px', position: 'relative' }}>
        <Navbar  />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/categorias"
            element={<PrivateRoute allowedRoles={["ADMIN", "OPERADOR"]} element={<Categoria />} />}
          />
          <Route
            path="/instrumentos"
            element={<PrivateRoute allowedRoles={["ADMIN", "OPERADOR"]} element={<Instrumento />} />}
          />
          <Route
            path="/estadisticas"
            element={<PrivateRoute allowedRoles={["ADMIN"]} element={<Estadisticas />} />}
          />

          <Route path="/detalles/:id" element={<Detalles addToCart={addToCart} userRole={userRole} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
