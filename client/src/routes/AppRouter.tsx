import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../features/auth/Login";
import { ProjectPage } from "../features/projects/ProjectPage";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/projects" element={<ProjectPage />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
