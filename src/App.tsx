import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TopeEcom from "./pages/TopeEcom/TopeEcom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/topeecom" element={<TopeEcom />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
