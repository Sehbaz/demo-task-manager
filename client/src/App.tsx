// react
import { BrowserRouter, Routes, Route } from "react-router-dom";

// routes
import { ProtectedRoute } from "@/routes/ProtectedRoute";

// features
import { Login } from "@/features/login/components/Login";
import { ProjectsPage } from "@/features/project/components/ProjectsPage";
import { ProjectDetailPage } from "@/features/project/components/ProjectDetailPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
