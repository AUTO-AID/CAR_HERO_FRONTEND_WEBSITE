import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "@/presentation/pages/Home";
import RegisterPage from '@/presentation/pages/RegisterPage';
import './index.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
