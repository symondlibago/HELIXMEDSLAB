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
import ProductDetails from "./pages/ProductDetails";
import Legal from "./pages/Legal";

// Reset scroll to the top when navigating between pages (hash links handle themselves).
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) return;

    if (lenis) {
      // `force` is what makes this work from the mobile drawer. This effect
      // runs before Navbar's, so the drawer's lenis.stop() is still in
      // effect at this point, and a stopped instance ignores scrollTo
      // outright — which left you wherever you were on the previous page.
      lenis.scrollTo(0, { immediate: true, force: true });
      // The outgoing page may have been taller than the incoming one, so
      // let lenis re-measure rather than keep the old scroll limit.
      lenis.resize();
    } else {
      window.scrollTo(0, 0);
    }
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
            {/* :productSlug matches the param ProductDetails reads via useParams */}
            <Route path="/products/:productSlug" element={<ProductDetails />} />
            <Route path="/legal" element={<Legal />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ReactLenis>
  );
}

export default App;
