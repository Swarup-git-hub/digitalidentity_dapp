import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EnhancedApp from "../components/EnhancedApp";
import ImmersiveIdentityApp from "../components/ImmersiveIdentityApp";
import IdentityDashboard from "../components/IdentityDashboard";
import ProfileView from "../components/ProfileView";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/app" replace />} />
        <Route path="/app" element={<EnhancedApp />} />
        <Route path="/immersive" element={<ImmersiveIdentityApp />} />
        <Route path="/dashboard" element={<IdentityDashboard />} />
        <Route path="/profile/:address" element={<ProfileView />} />
      </Routes>
    </BrowserRouter>
  );
}
