import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/dashboard" // path issue again(ESLint)
import Cars from "./pages/Cars";
import Customers from "./pages/Customers";
import Logs from "./pages/Logs";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import Rents from "./pages/Rents";
import ProgressBar from "./components/ProgressBar"

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <ProgressBar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/rentals" element={<Rents />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/settings" element={<Settings />} />

        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
