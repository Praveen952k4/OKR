import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
import Teams from './components/Teams';
import Settings from './components/Settings';
import Reports from './components/Reports';
import CreateOKR from './components/CreateOKR';
import Analytics from './components/Analytics';
import Calendar from './components/Calendar';
import AdminPanel from './components/AdminPanel';

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/settings" element={<Settings />}/>
        <Route path="/reports" element={<Reports />}/>
        <Route path="/my-okrs" element={<CreateOKR />}/>
        <Route path="/analytics" element={<Analytics />}/>
        <Route path="/calendar" element={<Calendar />}/>
        <Route path="/admin" element={<AdminPanel />}/>
    </Routes>

  );
};

export default App;
