import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import AdminLayout from "./components/Layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute"; // Proteksi rute

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rute untuk login */}
        <Route path="/" element={<Login />} />

        {/* Rute untuk registrasi */}
        <Route path="/register" element={<Register />} />

        {/* Rute admin dengan proteksi */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          </Route>
          </Route>

        {/* Rute untuk halaman 404 */}
        <Route path="*" element={<h1>404 - Halaman Tidak Ditemukan</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
