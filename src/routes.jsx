// AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AuthPage from './components/AuthPage';
import BookingPage from './components/BookingPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/book/:linkId"
        element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
