import { Outlet } from "react-router-dom";
import Layout from "../Layout";

const LayoutRoutes = () => {
  return (
    <>
      <Layout />
      <Outlet />
    </>
  );
};

export default LayoutRoutes;
