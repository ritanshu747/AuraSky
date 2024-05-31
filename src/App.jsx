import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Maps from "./Pages/Maps";
import Navbar from "./components/Navbar";
import SectionWeather from "./Pages/SectionWeather";
import ContextProvider from "./context/Context";
import "./styles/global/colors.css";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast"; // Corrected import
import { useState } from "react";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Toaster /> {/* Render the Toaster component */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/maps" element={<Maps />} /> {/* Corrected path */}
          <Route path="/section-weather/:city" element={<SectionWeather />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
