export default {
 path :'/finance',
 name :'finance',
 component : () =>{
  return import('@/views/Finance/FinanceApp')
 },
 children:[
    {
      path: "/profile",
      name: "profilefinance",
      component: () =>{
        return import('@/views/Global/ProfileApp')

      },
    },
    {
      path: "/income",
      name: "income",
      component: () =>{
        return import('@/views/Global/IncomeApp')

      },
    },
    {
      path: "/expence",
      name: "expence",
      component: () =>{
        return import('@/views/Global/ExpenceApp')

      },
    }
  ]
}