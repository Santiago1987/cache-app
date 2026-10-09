import { Routes, Route } from "react-router";
import Layout from "@/components/common/Layout";
import Home from "@/pages/Home";
import TopeEcom from "@/pages/TopeEcom/TopeEcom";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import Log from "@/pages/Log/components/Log";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/topeecom" element={<TopeEcom />} />
          <Route path="/log" element={<Log />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
