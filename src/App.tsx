import { PrimeReactProvider } from "primereact/api";
import "/node_modules/primeflex/primeflex.css";
import "primereact/resources/themes/mdc-dark-deeppurple/theme.css";
import { LoginPage } from "./screens/LoginPage";
import { FooterComponent } from "./components/FooterComponent";

export const App = () => {
  return (
    <PrimeReactProvider>
      <LoginPage />
      <FooterComponent />
    </PrimeReactProvider>
  );
};
