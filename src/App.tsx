import { BrowserRouter } from "react-router-dom";
import ThemeManager from "./components/managers/ThemeManager";
import AppRouter from "./routers/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <ThemeManager>
        <AppRouter />
      </ThemeManager>
    </BrowserRouter>
  );
}

export default App;
