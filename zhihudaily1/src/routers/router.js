import Home from "../pages/Home";
import { Navigate } from "react-router-dom";
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
];
