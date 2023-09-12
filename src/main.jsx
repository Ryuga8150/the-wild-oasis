import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/*
    
      These Error Boundary only catches error
      while react is rendering
      so bugs occuring in event handlers , effect,async code
      will not get caught
    
    */}
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      //since cannot use react router her
      //specifying onReset here gets passed in fallback as well
      onReset={() => window.location.replace("/")}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
