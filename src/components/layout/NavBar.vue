<template>
<section class="warehouse__navbar">
  <div class="warehouse__navbar-prof">
    <img :src="$store?.state?.me?.image" alt="user " @click="isShow">
    <article :class="isHide ? 'article1' : 'article2'"></article>
    <aside :class="isHide ? 'warehouse__user-show' : 'warehouse__user-hide'">
      <ul>
        <li @click="Go_to_profile">Profile</li>
        <li @click="logout">Log out</li>
      </ul>
    </aside>

  </div>
</section>
</template>

<script setup>
import {ref} from "vue"
import {useRouter} from "vue-router"
const router = useRouter()
const isHide = ref(false)
const isShow = ()=>{
  isHide.value = !isHide.value
}

const Go_to_profile =()=>{
 const role = sessionStorage.getItem('role')
// router.push({name:"profile"})
console.log(role)

  if(role === 'director'){
    router.push({name:'profiledirector'})
  }else if(role === 'salesman'){
    router.push({name :'profilesales'})
  }else if(role === 'financier'){
    router.push({name :'profilefinance'})
  }else if(role === 'warehouseman'){
    router.push({name :'profile'})
  }else{
    router.push({name : "login"})
  }
  isShow()
}

const logout =()=>{
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('role')
  location.reload()
}

</script>

<style scoped lang="scss">
$bg-color: #fff;
$blue-color:#435ebe;
.warehouse__navbar{
  position: sticky;
  top: 0;
  width: 100%;
  padding: 8px 20px;
  background: #fff;
  box-shadow: 0px 2px 2px rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.warehouse__navbar-prof{
  width: 55px;
  height: 55px;
  background: #fff;
  border-radius: 50%;
  cursor: pointer;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    position: relative;
  }
  .article2{
    display: none;
  }
  .article1{
    display: block;
    width: 17px;
    height: 17px;
    background: #f2f7ff;
    transform: rotate(315deg);
    border-radius: 2px;
    position: absolute;
    top: 90%;
    right: 30px;
  }
  .warehouse__user-hide{
    display: none;
  }
  .warehouse__user-show{
    display: block;
    position: absolute;
    top: 100%;
    right: 20px;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    box-shadow: 2px 2px 2px 2px rgb(224 , 223,223);
    ul{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: $bg-color;
      padding: 0;
      li{
        width: 100%;
        text-align: center;
        padding: 5px;
        font-size: 17px;
        transition:  all 0.4s linear;
        letter-spacing: 0.4px;
        &:hover{
          background: $blue-color;
          color: #fff;
        }
      }
    }
  }
}

</style>