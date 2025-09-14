import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { SelectionProvider } from "./context/SelectionContext";
import App from "./App";
import "./style.css";  

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SelectionProvider>
        <App />
      </SelectionProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
