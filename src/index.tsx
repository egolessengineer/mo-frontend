import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./Context/auth";
import App from './Pages/App';
import { HashConnectAPIProvider } from './Providers/HasConnectAPIProvider';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './tailwind.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashConnectAPIProvider debug={false}>
      <AuthContextProvider>
        <ToastContainer autoClose={1500} />
        <App />
      </AuthContextProvider>
    </HashConnectAPIProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
