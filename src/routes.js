// import Dashboard from "views/Dashboard.jsx";
import Login from "views/Login.jsx";
import UnAuthorized from "views/UnAuthorized.jsx";

import Registeration from "./views/Registeration/Registeration"

import Accounts from "./views/Accounts/Accounts"
import Courier from './views/Courier/Courier'
import DashBoard from './views/Dashboard'
var dashboardRoutes = [
  {
    path: "/dashboard",
    layout: "/admin",
    name: "DashBoard",
    component: DashBoard,
    icon: "pe-7s-graph"
  },
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
  {
    path: "/accounts",
    layout: "/admin",
    name: "Accounts",
    component: Accounts,
    icon: "pe-7s-note"
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
