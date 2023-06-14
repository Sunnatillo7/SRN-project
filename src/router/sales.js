export default {
    path :"/sales",
    name: 'sales',
    component : () =>{
        return import('@/views/Sales/SalesApp')
    },
    children:[
        {
          path: "/profile",
          name: "profilesales",
          component: ()=>{
            return import('@/views/Global/ProfileApp')

          },
        },
        {
          path: "/clients",
          name: "clients",
          component: ()=>{
            return import('@/views/Global/ClientsApp')

          },
        }
      ]
}