import ThemeManager from "./components/managers/ThemeManager";
import Login from "./pages/login/Login";

function App() {
  return (
    <ThemeManager>
      <Login />
    </ThemeManager>
  );
}

export default App;
