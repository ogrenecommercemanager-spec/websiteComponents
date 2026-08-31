import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from "./App.jsx";

function Main() {
  return(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Main />)
