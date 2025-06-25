// react
import { BrowserRouter, Routes, Route } from "react-router-dom";

// routes
import { ProtectedRoute } from "@/routes/ProtectedRoute";

// features
import { Login } from "@/features/login/Login";
import { ProjectPage } from "@/features/projects/ProjectPage";
import { ProjectDetailPage } from "@/features/projects/ProjectDetailsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
