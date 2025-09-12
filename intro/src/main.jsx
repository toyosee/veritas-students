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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/customers" element={<CustomersDetails />} />
        <Route path="/system" element={<SystemDetails />} />
        <Route path="/about" element={<AboutDeveloper />} />
        <Route path="/form" element={<SubmitForm />} />
        <Route path="/submissions" element={<Submissions />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);