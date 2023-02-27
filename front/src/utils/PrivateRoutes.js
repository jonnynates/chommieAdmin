import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage, { TOKEN_STORAGE_KEY } from "../hooks/useLocalStorage";

const PrivateRoutes = () => {
  const [tokenInStorage, setTokenInStorage] = useLocalStorage(
    TOKEN_STORAGE_KEY,
    null
  );
  return tokenInStorage ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
