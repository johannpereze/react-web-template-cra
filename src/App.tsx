import { BrowserRouter } from "react-router-dom";
import ThemeManager from "./components/managers/themeManager/ThemeManager";
import AppRouter from "./routers/AppRouter";

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
