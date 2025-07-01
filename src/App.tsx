import { PrimeReactProvider } from 'primereact/api';
import "/node_modules/primeflex/primeflex.css"
import "primereact/resources/themes/mdc-dark-deeppurple/theme.css"
import { LoginPage } from './screens/LoginPage';

export const App = () => {
  return (
    <PrimeReactProvider>
      <LoginPage />
    </PrimeReactProvider>
  )
}
