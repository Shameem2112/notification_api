import { Routes, Route, Navigate } from "react-router-dom";
import Notifications from "../pages/Notifications";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/notifications" replace />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
}