import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { HomePage } from '../pages/Home';
import { LoginPage } from '../pages/Login';
import ProtectedRoute from './protected';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProtectedRoute><HomePage  /></ProtectedRoute>} />
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
} 