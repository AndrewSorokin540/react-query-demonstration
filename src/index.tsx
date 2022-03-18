import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider } from "react-query";

import App from "./App";

import { queryClient } from "react-query-hooks/queryClient";

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
