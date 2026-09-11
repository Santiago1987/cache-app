import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TopeEcom from "./pages/TopeEcom";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="topeecom" element={<TopeEcom />} />
      </Route>
    </Routes>
  );
}

export default App;
