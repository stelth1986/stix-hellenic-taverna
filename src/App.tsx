import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import { ConfigProvider } from "./lib/config";
import Home from "./pages/Home";
import LocationPage from "./pages/Location";
import MenuPage from "./pages/Menu";
import FunctionsPage from "./pages/Functions";
import ChristmasPage from "./pages/Christmas";
import GalleryPage from "./pages/Gallery";
import ContactPage from "./pages/Contact";
import AdminPage from "./pages/Admin";

export default function App() {
  return (
    <ConfigProvider>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/location" element={<LocationPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/functions" element={<FunctionsPage />} />
                <Route path="/christmas" element={<ChristmasPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </ConfigProvider>
  );
}
