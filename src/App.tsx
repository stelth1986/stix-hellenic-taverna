import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router";
import Layout from "./components/Layout";
import Seo from "./components/Seo";
import { ConfigProvider } from "./lib/config";
import { track } from "./lib/pixel";
import Home from "./pages/Home";
import LocationPage from "./pages/Location";
import MenuPage from "./pages/Menu";
import FunctionsPage from "./pages/Functions";
import ChristmasPage from "./pages/Christmas";
import ChristmasThanksPage from "./pages/ChristmasThanks";
import GalleryPage from "./pages/Gallery";
import ContactPage from "./pages/Contact";
import AdminPage from "./pages/Admin";

function PixelTracker() {
  const location = useLocation();
  const firstLoad = useRef(true);

  // ViewContent on every page. PageView fires once from the base pixel code,
  // so we only fire it ourselves when the visitor moves between pages.
  useEffect(() => {
    if (location.pathname.startsWith("/admin")) return;
    if (firstLoad.current) {
      firstLoad.current = false;
    } else {
      track("PageView");
    }
    track("ViewContent", { content_name: location.pathname });
  }, [location.pathname]);

  // Schedule when someone clicks any Book a Table link (they all go to OpenTable).
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest?.("a[href*='opentable.com']");
      if (link) track("Schedule");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

export default function App() {
  return (
    <ConfigProvider>
      <PixelTracker />
      <Seo />
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
                <Route path="/christmas/thank-you" element={<ChristmasThanksPage />} />
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
