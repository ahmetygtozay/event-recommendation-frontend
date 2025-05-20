import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RecommendPage from './pages/RecommendPage';
import EventDetailPage from './pages/EventDetailPage';
import UserHistoryPage from './pages/UserHistoryPage';
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Always visible */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recommend" element={<RecommendPage />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
          <Route path="/history/:userId" element={<UserHistoryPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
