// import Dashboard from "views/Dashboard.jsx";
import Login from "views/Login.jsx";
import UnAuthorized from "views/UnAuthorized.jsx";

import Registeration from "./views/Registeration/Registeration"


import Courier from './views/Courier/Courier'

var dashboardRoutes = [
  
  {
    path: "/registeration",
    layout: "/admin",
    name: "Registeration",
    component: Registeration,
    icon: "pe-7s-add-user"
  },
  {
    path: "/dSale",
    layout: "/admin",
    name: "Daily Sale",
    component: Courier,
    icon: "pe-7s-paperclip"
  },



];

export const accountRoutes = [
  {
    path: "/login",
    name: "Login",
    icon: "pe-7s-graph",
    component: Login,
    layout: "/account"
  },
  {
    path: "/unauthorized",
    name: "Aunthorized",
    icon: "pe-7s-graph",
    component: UnAuthorized,
    layout: "/account"
  },

];
export default dashboardRoutes;
