import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import Register from './pages/Register';
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import VerifyOtp from './pages/VerifyOtp';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/forgot-password" element={<ForgetPassword />} /> 
        <Route path="/reset-password" element={<ResetPassword />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </Router>
  );
}

export default App;
