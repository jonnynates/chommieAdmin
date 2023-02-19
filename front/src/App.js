import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { RecoilRoot } from "recoil";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const App = () => {
  const [isIe, setIsIe] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf("MSIE ");

    if (msie > 0) {
      setIsIe(true);
    }
  }, []);

  if (isIe) {
    return (
      <>
        <h1>"You seem to be using an unsupported browser"</h1>
        <p>
          "To continue with Nomadd, kindly return with a modern browser. Google
          Chrome, Microsoft Edge, Safarior Firefox are great choices!"
        </p>
      </>
    );
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Navigation />
      </LocalizationProvider>
    </>
  );
};

const WrappedApp = () => {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};

export default WrappedApp;
