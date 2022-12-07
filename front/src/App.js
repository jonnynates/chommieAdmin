import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Requests from "./pages/Requests";
import RequestDetails from "./pages/Requests/RequestDetails";
export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/requests" element={<Requests />} />
        <Route path="/new-requests" element={<Requests />} />
        <Route path="/orders/:id" element={<RequestDetails />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
