import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import App from "./App";
import CustomersDetails from "./components/CustomersDetails";
import SystemDetails from "./components/SystemInfo";
import AboutDeveloper from "./pages/About";
import SubmitForm from "./pages/InteractionForm";
import Submissions from "./components/Submissions";
import DbCustomersDetails from "./pages/DbCustomers.jsx.jsx";
import VirtualParent from "./components/VirtualParent.jsx";
import AddCustomer from "./components/AddCustomer.jsx";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/customers" element={<CustomersDetails />} />
        <Route path="/system" element={<SystemDetails />} />
        <Route path="/about" element={<AboutDeveloper />} />
        <Route path="/form" element={<SubmitForm />} />
        <Route path="/dbcustomers" element={<DbCustomersDetails />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/parent" element={<VirtualParent />} />
        <Route path="/add-customer" element={<AddCustomer />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);