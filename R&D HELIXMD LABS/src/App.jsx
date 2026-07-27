import "./App.css";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";

// Reset scroll to the top when navigating between pages (hash links handle themselves).
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) return;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash, lenis]);

  return null;
}

function App() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,        // lower = smoother/heavier glide
        smoothWheel: true,
        wheelMultiplier: 1,
      }}
    >
      <div className="App">
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ReactLenis>
  );
}

export default App;
