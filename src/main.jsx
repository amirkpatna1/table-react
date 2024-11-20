import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import store, { persistor } from "./store/index.js";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </StrictMode>
    ,
  </Provider>
);
