import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import ScrollUp from "./components/ScrollUp";
import HomePage from "./pages/HomePage";
import DashboardLayout from "./pages/Dashboard/DashboardHomePage";
import RequestLoadPage from "./pages/Dashboard/RequestLoadPage";
import PaymentsPage from "./pages/Dashboard/PaymentsPage";
import CompliancePage from "./pages/Dashboard/CompliancePage";
import SupportPage from "./pages/Dashboard/SupportPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./Auth/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServicesPage from "./pages/ServicesPage";
import DriverSignupPage from "./pages/Auth/DriverSignupPage";
import AdminLogin from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/driver-signup" element={<DriverSignupPage />} />
          <Route path="/request-load" element={<RequestLoadPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/support" element={<SupportPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/compliance" element={<CompliancePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
        <ScrollUp />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
