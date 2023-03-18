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
} from "./pages/";
import Navbar from "./layout/Navbar";

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
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
