// import { from } from "core-js/core/array";
import { createRouter, createWebHistory } from "vue-router";

import auth from "./auth"
import director from "./director"
import sales from './sales'
import finance from "./finance"
import warehouse from './warehouse'

const routes = [


  auth,
  director,
  sales,
  finance,
  warehouse,

 




  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  const name = to.name === "login";

  if (!token && !name) {
    return next({ name: "login" });
  } else {
    if (token && name) {
      if (role === "director") {
        return next({ name: "director" });
      } else if (role === "salesman") {
        return next({ name: "sales" });
      } else if (role === "financier") {
        return next({ name: "finance" });
      } else if (role === "warehouseman") {
        return next({ name: "wearehouse" });
      }
    } else {
      return next();
    }
  }
});

export default router;
