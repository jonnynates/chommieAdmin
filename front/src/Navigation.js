import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Requests from "./pages/Requests";
import RequestDetails from "./pages/Requests/RequestDetails";
import Login from "./pages/Login";
import PrivateRoutes from "./utils/PrivateRoutes";
import LayoutRoutes from "./utils/LayoutRoutes";
import useLocalStorage, { TOKEN_STORAGE_KEY } from "./hooks/useLocalStorage";
import useAuthUser from "./hooks/useAuthUser";
import Kits from "./pages/Kits";
import AddNewRequest from "./pages/Requests/AddNewRequest";
import EditRequest from "./pages/Requests/EditRequest";

export default function Navigation() {
  const [hasPerformedInitialLoad, setHasPerformedInitialLoad] = useState(false);
  const [tokenInStorage, setTokenInStorage] = useLocalStorage(
    TOKEN_STORAGE_KEY,
    null
  );
  const [loadingUser, authUser] = useAuthUser(tokenInStorage, () =>
    setHasPerformedInitialLoad(true)
  );

  useEffect(() => {
    if (hasPerformedInitialLoad) {
      return;
    }

    authUser(tokenInStorage);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoutes />}>
          <Route element={<LayoutRoutes />}>
            <Route path="/new-requests" element={<Requests />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/orders/:id" element={<RequestDetails />} />
            <Route path="/orders/:id/edit" element={<EditRequest />} />
            <Route path="/orders/new" element={<AddNewRequest />} />
            <Route path="/kits" element={<Kits />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
