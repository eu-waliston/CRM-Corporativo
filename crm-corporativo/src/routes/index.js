import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from '../components/layout/MainLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Leads from '../pages/Leads';
import Contacts from '../pages/Contacts';
import Deals from '../pages/Deals';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';

import Calendar from '../pages/Calendar';
import Communications from '../pages/Communications';
import Documents from '../pages/Documents';

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth?.token);
  const state = useSelector((state) => state);
  console.log('🔐 PRIVATE ROUTE TOKEN:', token);
  console.log('🧠 REDUX STATE:', state);
  return token ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="leads" element={<Leads />} />
        {/* TODO ERRO NA ROTA DE LEADS [ NO COMPONENTE ] */}
        <Route path="contacts" element={<Contacts />} />
        {/* TODO ERRO NA ROTA DE CONTATOS [ NO COMPONENTE ] */}
        <Route path="deals" element={<Deals />} />
        {/* TODO ERRO NA ROTA DE NEGOCIOS [ NO COMPONENTE ] */}
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />

        <Route path="profile" element={<Profile />} />

        <Route path="calendar" element={<Calendar />} />
        <Route path="communications" element={<Communications />} />
        <Route path="documents" element={<Documents />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
