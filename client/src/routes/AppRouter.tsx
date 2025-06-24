import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../features/auth/Login";
import { ProjectPage } from "../features/projects/ProjectPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { ProjectDetailPage } from "../features/projects/ProjectDetailsPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
