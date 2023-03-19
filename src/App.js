import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Error404,
  Home,
  About,
  Contact,
  Login,
  Register,
  Service,
  Novedades,
  Perfil,
  Admin,
} from "./pages/";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/*" element={<Error404 />} />
            <Route index path="/" element={<Home />} />
            <Route path="/sobre-nosotros" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/servicios" element={<Service />} />
            <Route path="/novedades" element={<Novedades />} />
            <Route path="/perfil" element={<Perfil />} />
            {/* Ruta protegida */}
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
        </Router>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Provider>
    </>
  );
}

export default App;
