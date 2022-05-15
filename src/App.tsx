import { Amplify } from "aws-amplify";
import { BrowserRouter } from "react-router-dom";
import currentConfig from "./aws/AmplifyConfig";
import ThemeManager from "./components/managers/themeManager/ThemeManager";
import AppRouter from "./routers/AppRouter";

Amplify.configure(currentConfig);

function App() {
  return (
    <BrowserRouter basename="/react-web-template-cra">
      <ThemeManager>
        <AppRouter />
      </ThemeManager>
    </BrowserRouter>
  );
}

export default App;
