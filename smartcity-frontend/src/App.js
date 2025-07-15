import React from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Blog from './components/Blog';
import UserSettings from './components/UserSettings';
import FastReportPage from './components/FastReport';
import DetailedReportPage from './components/DetailedReport';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/userDashboard"   
        element={
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        } 
      />
      <Route path="/userSettings"
       element={<ProtectedRoute><UserSettings /> </ProtectedRoute>} />
      <Route path="/fastReport" element={<ProtectedRoute><FastReportPage /></ProtectedRoute>} />
      <Route path="/detailedReport" element={<ProtectedRoute><DetailedReportPage /></ProtectedRoute>} />
      {/* Redirect any unknown paths to the sign-in page */}
    </Routes>
  );
}

export default App;
