import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import ModalContextProvider from "./conponent/Modal/ModalContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  // <React.StrictMode>
  // <ModalContextProvider>
  <App />,
  // </ModalContextProvider>,
  // </React.StrictMode>,
);
