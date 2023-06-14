<template>
 <section class="warehouse">
  <div class="warehouse__sidebar">
    <Sidebar :isShowItem="isShowItem" :isShow="isShow" :globalSidebar='globalSidebar' />
  </div>
  <div class="warehouse__main1">
    <div class="warehouse-navbar">
        <Navbar/>
    </div>
    <router-view class="router" ></router-view>
  </div>
 </section>
</template>

<script setup>
 import Sidebar from "../../components/layout/SideBar.vue"
 import Navbar from "../../components/layout/NavBar.vue"
 import {onMounted, ref} from "vue"
 import store from "@/store"
  const isShow = ref(false)
 const isShowItem = () =>{
   isShow.value = !isShow.value
 }


 onMounted(()=>{
  store.dispatch("getMe")
  store.dispatch("getSuppliers")
  // store.dispatch("getBrands")
  // store.dispatch("getGroups")
 })
 const globalSidebar = ref([
  {name:'Product', icon:'fa-solid fa-coins', child:'product_lists', path:'/product'},
  {name:'Arrived', icon:'fa-solid fa-building-circle-check',  path:'/arrived'},
  {name:'Delivered', icon:'fa-solid fa-building-circle-arrow-right',  path:'/delivered'},
  {name:'Returned', icon:'fa-solid fa-building-circle-exclamation',  path:'/returned'},
  {name:'Suppliers', icon:'fa-solid fa-truck-field', path:'/suppliers'},
 ])
</script>

<style scoped lang="scss">
$bg-color : #f2f7ff;


.warehouse{
  width: 100%;
  height: 100vh;
  display: flex;
  %warehouse__global{
    height: 100%;
    background: $bg-color;
    transition:  all 0.4s linear;

  }
  .warehouse__main1{
    width: calc(100% - 300px);
    @extend %warehouse__global
  }
  .warehouse__main{
    width: calc(100% - 53px);
    @extend %warehouse__global
  }

  .warehouse__sidebar1{
    width: 62px;
    transition: all 0.4s linear;
  }
  .warehouse__sidebar{
    width: 300px;
  }

  .warehouse-navbar{
    width: 100%;
    position: sticky;
    top: 0;
  }
}
@media screen and (max-width:1024px){
  %warehouse__global2{
    height: 100%;
      background: $bg-color;
      transition: all 0.4s linear;

  }
  .warehouse__sidebar{
    width: 62px !important;
  }
  .warehouse__main1{
    width: calc(100% - 53px) !important;
    @extend %warehouse__global2 
  }
}
</style>