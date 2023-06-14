export default {
  path: "/wearehouse",
  name: "wearehouse",
  component: () => {
    return import("@/views/Wearehouse/WearehouseApp");
  },
  children: [
    {
      path: "/profile",
      name: "profile",
      component: () => {
        return import("@/views/Global/ProfileApp");
      },
    },
    {
      path: "/product",
      name: "product",
      component: () => {
        return import("@/views/Global/ProductApp");
      },
    },
    {
      path: "/arrived",
      name: "arrived",
      component: () => {
        return import("@/views/Global/ArrivedApp");
      },
      // meta: {
      //   child: "delivered_lists",
      // },
    },
    {
      path: "/delivered",
      name: "delivered",
      component: () => {
        return import("@/views/Global/DeliveredApp");
      },
      //     meta:{
      //   child : 'delivered_lists'
      // }
    },
    {
      path: "/returned",
      name: "returned",
      component: () => {
        return import("@/views/Global/ReturnedApp");
      },
      //    meta:{
      //   child : 'returned_lists'
      // }
    },
    {
      path: "/groups",
      name: "groups",
      component: () => {
        return import("@/views/Global/GroupsBrands");
      },
      //    meta:{
      //   child : 'returned_lists'
      // }
    },
    {
      path: "/suppliers",
      name: "suppliers",
      component: () => {
        return import("@/views/Global/SuppliersApp");
      },
      //   meta:{
      //   child : 'suppliers_lists'
      // }
    },
    {
      path: "/singleProduct/:id",
      name: "singleProduct",
      meta: {
        child: "product_lists",
      },
      component: () => {
        return import("@/views/Wearehouse/SingleProduct");
      },
    },
    {
      path: "/innerArrived/:id",
      name: "innerArrived",
   
      component: () => {
        return import("@/views/Global/ArrivedInner");
      },
    },
    {
      path: "/innerDelivered/:id",
      name: "innerDelivered",
   
      component: () => {
        return import("@/views/Global/InnerDelivered");
      },
    },
    {
      path: "/innerReturned/:id",
      name: "innerReturned",
   
      component: () => {
        return import("@/views/Global/InnerReturned");
      },
    },
  ],
};
