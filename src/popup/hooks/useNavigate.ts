import { useContext } from "react";
import { RouterContext } from "../providers/RouterProvider";

export const useNavigate = () => {
  return useContext(RouterContext);
}