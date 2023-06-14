<template>
  <section :class="props.isShow ? 'sidebar1' : 'sidebar'">
    <div @click="props.isShowItem" class="sidebar__img">
      <i class="img-icon fa-solid fa-bars-staggered"></i>
    </div>
    <!-- <router-link v-for="(item, index) in globalSidebar" :key="index" :to="item.path" :class="item.child">
    <span><i :class="item.icon"></i></span>
    <span>{{item.name}}</span>
    </router-link> -->
    <div  v-if="role != 'director '" class="sidebar__items">
      <router-link v-for="(item, index) in globalSidebar" :key="index" :to="item.path" active-class="sidebar__item1" class="sidebar__item"  :class="{sidebar__item1 :$route.meta.child === 'product_lists'}">
        <span><i :class="item.icon"></i></span>
        <span :class="isShow ? 'sidebar__items-title' : '' ">{{item.name}}</span>
      </router-link>
    </div>
    <div  v-if="role != 'director '" class="sidebar__items">
      <router-link v-for="(item, index) in salesGlobal" :key="index" :to="item.path" active-class="sidebar__item1" class="sidebar__item"  :class="{sidebar__item1 :$route.meta.child === 'product_lists'}">
        <span><i :class="item.icon"></i></span>
        <span :class="isShow ? 'sidebar__items-title' : '' ">{{item.name}}</span>
      </router-link>
    </div>
    <div  v-if="role != 'director '" class="sidebar__items">
      <router-link v-for="(item, index) in barSide" :key="index" :to="item.path" active-class="sidebar__item1" class="sidebar__item"  :class="{sidebar__item1 :$route.meta.child === 'product_lists'}">
        <span><i :class="item.icon"></i></span>
        <span :class="isShow ? 'sidebar__items-title' : '' ">{{item.name}}</span>
      </router-link>
    </div>
    <div v-if="role != 'director '" class="sidebar__items">
      <router-link v-for="(item, index) in forBar" :key="index" :to="item.path" active-class="sidebar__item1" class="sidebar__item"  :class="{sidebar__item1 :$route.meta.child === 'product_lists'}">
        <span><i :class="item.icon"></i></span>
        <span :class="isShow ? 'sidebar__items-title' : '' ">{{item.name}}</span>
      </router-link>
    </div>
    <!-- <div class="sidebar__items2">
      <router-link to="/arrived" active-class="sidebar__item1" class="sidebar__item" >
        <span><i class="fa-solid fa-building-circle-check"></i></span>
        <span :class="isShow ? 'sidebar__items-title' : '' ">Arrived</span>
      </router-link>
    </div> -->
    <!-- <div class="sidebar__items2">
      <router-link to="/delivered" active-class="sidebar__item1" class="sidebar__item" >
        <span><i class="fa-solid fa-building-circle-arrow-right"></i></span>
        <span :class="isShow ? 'sidebar__items-title' : '' ">Delivered</span>
      </router-link>
    </div> -->
    <!-- <div class="sidebar__items2">
      <router-link to="/returned" active-class="sidebar__item1" class="sidebar__item" >
        <span><i class="fa-solid fa-building-circle-exclamation"></i></span>
        <span :class="isShow ? 'sidebar__items-title' : '' ">Returned</span>
      </router-link>
    </div> -->
    <!-- <div class="sidebar__items2">
      <router-link to="/suppliers" active-class="sidebar__item1" class="sidebar__item" >
        <span><i class="fa-solid fa-truck-field"></i></span>
        <span :class="isShow ? 'sidebar__items-title' : '' ">Suppliers</span>
      </router-link>
    </div> -->
  </section>
</template>

<script setup>
import { defineProps,  } from "vue";

 const props = defineProps({
  isShow: {
    type: Boolean,
  },
  isShowItem: {
    type: Function,
  },
  globalSidebar:{
    type:Array
  },
  salesGlobal:{
    type: Array
  },
  barSide:{
    type: Array
  },
  forBar:{
    type: Array
  },
});
</script>

<style lang="scss" scoped>
$blue-color: #435ebe;
$hover-color: #f0f1f5;
$bg-color: #fff;
.sidebar1 {
  width: 53px;
  height: 100vh;
  position: fixed;
  background: $bg-color;
  transition: all 0.4s linear;
  overflow: hidden;
}

.sidebar {
  width: 300px;
  height: 100vh;
  position: fixed;
  background: $bg-color;
  transition: all 0.4s linear;
  overflow: hidden;  
}

.sidebar__img {
  margin: 20px;
  .img-icon {
    font-size: 20px;
    color: $blue-color;
    cursor: pointer;
  }
}

.sidebar__items {
  width: 100%;
  // margin-top: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
@mixin sidebar__item($color, $bg_color) {
    color: $color;
    background: $bg_color;
    text-decoration: none;
  }

  .sidebar__items-title{
    overflow: hidden;
    display: none;
    transition: all 0.8s linear;
    font-size: 18px;
  }
  %sidebar__item {
    width: 90%;
    margin: 10px;
    padding: 12px 17px;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 15px;
    border-radius: 5px;
    cursor: pointer;
  }

  .sidebar__item {
    @extend %sidebar__item;
    @include sidebar__item($blue-color, transparent);
    &:hover {
      background: $hover-color;
    }
  }

  .sidebar__item1 {
    @extend %sidebar__item;
    @include sidebar__item(#fff, $blue-color);
    &:hover {
      background: $blue-color;
    }
  }
}
.sidebar__items2 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
@mixin sidebar__item($color, $bg_color) {
    color: $color;
    background: $bg_color;
  }

  .sidebar__items-title{
    overflow: hidden;
    display: none;
    transition: all 0.8s linear;
    font-size: 18px;
  }
  %sidebar__item {
    width: 90%;
    margin: 10px;
    padding: 12px 17px;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 15px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none
  }

  .sidebar__item {
    @extend %sidebar__item;
    @include sidebar__item($blue-color, transparent);
    &:hover {
      background: $hover-color;
    }
  }

  .sidebar__item1 {
    @extend %sidebar__item;
    @include sidebar__item(#fff, $blue-color);
    &:hover {
      background: $blue-color;
    }
  }
}


@media screen and (max-width: 1024px) {
  .sidebar {
    width: 53px;
    height: 100vh;
    position: fixed;
    background: $bg-color;
    transition: all 0.4s linear;
    overflow: hidden;
  }
  .sidebar1 {
    width: 300px;
    height: 100vh;
    position: fixed;
    background: $bg-color;
    transition: all 0.4s linear;
    z-index: 999;
    overflow: visible;
  }

  @mixin sidebar__item($color, $bg_color) {
    color: $color;
    background: $bg_color;
  }
  %sidebar_item {
    display: block;
    width: 90%;
    margin: 10px;
    padding: 12px 17px;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 15px;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
