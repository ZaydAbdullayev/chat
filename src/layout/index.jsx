import { Outlet } from "react-router-dom";
import troop from "../assets/troop.png";

export const Layout = () => {
  return (
    <div className="w100 h100 df fdc aic p-r layout">
      <Outlet />
      <img src={troop} alt="troop" className="bg" />
    </div>
  );
};
