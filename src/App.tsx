import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LocationPage from "./pages/Location";
import MenuPage from "./pages/Menu";
import FunctionsPage from "./pages/Functions";
import GalleryPage from "./pages/Gallery";
import ContactPage from "./pages/Contact";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/functions" element={<FunctionsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}
