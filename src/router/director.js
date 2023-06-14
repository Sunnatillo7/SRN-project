export default {
    path : "/director",
    name : 'director',
    component : ()=>{
        return import('@/views/Director/DirectorApp')
    },
    children:[
        {
          path: "/profile",
          name: "profiledirector",
          component: ()=>{
            return import('@/views/Global/ProfileApp')
          }
        },
        {
          path: "/demo",
          name: "demo",
          component: ()=>{
            return import('@/views/Director/DashboardDemo')
          }
        },
        {
          path: "/dashboard",
          name: "dashboard",
          component: ()=>{
            return import('@/views/Director/DashBoard')
          }
        },
        {
          path: "/arrivedChild",
          name: "arrivedChild",
          component: ()=>{
            return import('@/views/Global/ArrivedApp')
          }
        },
        {
          path: "/productDirector",
          name: "productDirector",
          component: ()=>{
            return import('@/views/Global/ProductApp')
          }
        },
        {
          path: "/deliveredDirector",
          name: "deliveredDirector",
          component: ()=>{
            return import('@/views/Global/DeliveredApp')
          }
        },
        {
          path: "/returnedDirector",
          name: "returnedDirector",
          component: ()=>{
            return import('@/views/Global/ReturnedApp')
          }
        },
        {
          path: "/suppliersDirector",
          name: "suppliersDirector",
          component: ()=>{
            return import('@/views/Global/SuppliersApp')
          }
        },
        {
          path: "/clientsApp",
          name: "clientsApp",
          component: ()=>{
            return import('@/views/Global/ClientsApp')
          }
        },
        {
          path: "/incomeDirector",
          name: "incomeDirector",
          component: ()=>{
            return import('@/views/Global/IncomeApp')
          }
        },
        {
          path: "/expenceDirector",
          name: "expenceDirector",
          component: ()=>{
            return import('@/views/Global/ExpenceApp')
          }
        },
   
      ]
}