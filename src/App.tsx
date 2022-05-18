import { Amplify } from "aws-amplify";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";
import currentConfig from "./aws/AmplifyConfig";
import ThemeManager from "./components/managers/themeManager/ThemeManager";
import AppRouter from "./routers/AppRouter";

Amplify.configure(currentConfig);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/react-web-template-cra">
          <ThemeManager>
            <AppRouter />
          </ThemeManager>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
