import React from "react";
import ReactDOM from "react-dom/client";
import "modern-normalize";
import App from './components/App';
import "./index.css";
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <div>
    <App />
    <Toaster position="top-right" />
  </div>
);


