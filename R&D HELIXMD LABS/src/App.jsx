import "./App.css";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import WelcomeModal from "./components/WelcomeModal";
import { AccountProvider, useAccount } from "./context/AccountContext";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Legal from "./pages/Legal";
import COA from "./pages/COA";
import Register from "./pages/Register";

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

/* The catalog is closed to the public: until an account exists, registration
   IS the landing page and every other route redirects to it.

   `/legal` stays open on purpose — the registration form itself links out to
   the Terms and Privacy Policy, and those have to be readable before someone
   agrees to them. */
const PUBLIC_PATHS = ["/register", "/legal"];

function RequireAccount({ children }) {
  const { isRegistered } = useAccount();
  const { pathname } = useLocation();

  const isPublic = PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (!isRegistered && !isPublic) {
    return <Navigate to="/register" replace />;
  }
  return children;
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
          <AccountProvider>
            <ScrollToTop />
            <Navbar />
            {/* Greets a first-time visitor on whatever page they land on. */}
            <WelcomeModal />
            <RequireAccount>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products" element={<Products />} />
                {/* :productSlug matches the param ProductDetails reads via useParams */}
                <Route path="/products/:productSlug" element={<ProductDetails />} />
                <Route path="/coa" element={<COA />} />
                <Route path="/register" element={<Register />} />
                <Route path="/legal" element={<Legal />} />
              </Routes>
            </RequireAccount>
          </AccountProvider>
        </BrowserRouter>
      </div>
    </ReactLenis>
  );
}

export default App;
