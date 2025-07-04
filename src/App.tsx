import { PrimeReactProvider } from "primereact/api";
import "/node_modules/primeflex/primeflex.css";
import "primereact/resources/themes/mdc-dark-deeppurple/theme.css";
import { LoginPage } from "./screens/LoginPage";
import { FooterComponent } from "./components/FooterComponent";
import { NavbarComponent } from "./components/NavbarComponent";
import { AuthProvider } from "./auth/authContext";
import { Route, Routes } from "react-router";
import 'primeicons/primeicons.css';
import { SignupPage } from "./screens/SignupPage";

export const App = () => {
  return (
    <PrimeReactProvider>
      <AuthProvider>
        <NavbarComponent />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        <FooterComponent />
      </AuthProvider>
    </PrimeReactProvider>
  );
};
