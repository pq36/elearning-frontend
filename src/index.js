import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App";
import { AuthProvider } from './AuthContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <AuthProvider>
    <App />
    </AuthProvider>
    <Toaster />
  </React.StrictMode>
);

