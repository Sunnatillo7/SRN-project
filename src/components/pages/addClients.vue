<template>
  <appModal v-model="dialog">
    <h3 class="title">Add clients</h3>

   <Form @submit="formSubmit">
         <label for="name">Client name</label>
      <Field
        rules="required"
        :modelValue="form.title"
        v-slot="{ errors }"
        name="Client name"
      >
        <div class="Login__form-input">
          <input
            id="password"
            placeholder="Client name"
            type=" text"
            v-model="form.title"
          />
        </div>
        <p class="login__input-error" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
         <label for="name">Address</label>
      <Field
        rules="required"
        :modelValue="form.address"
        v-slot="{ errors }"
        name="Address"
      >
        <div class="Login__form-input">
          <input
            id="password"
            placeholder="Address"
            type=" text"
            v-model="form.address"
          />
        </div>
        <p class="login__input-error" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
         <label for="name">Phone number</label>
      <Field
        rules="required"
        :modelValue="form.phone_number"
        v-slot="{ errors }"
        name="Phone number"
      >
        <div class="Login__form-input">
          <input
            id="password"
            placeholder="Phone number"
            type=" number"
            v-model="form.phone_number"
          />
        </div>
        <p class="login__input-error" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
          <div class="flex__div">
         <button type="submit">Add</button>
     </div>
   </Form>
  </appModal>
</template>

<script setup>
import appModal from "@/components/ui/app-modal";
import { Form, Field } from "vee-validate";
import { ref, defineExpose } from "vue";
import Notification from "../../plugins/Notification";

import http from "../../plugins/axios";
const dialog = ref(false)
const openModal = ()=>{
    dialog.value = !dialog.value
}
defineExpose({openModal})
const form = ref({
    phone_number:'',
    address:'',
    title:''
})
const formSubmit =()=>{
    http.post(`/api/sales/client/`,{
        title: form.value.title,
        phone_number: form.value.phone_number,
        address: form.value.address
    }).then(res =>{
        console.log(res , 'needdd')
        if(res.status === 201){
         Notification({text:'Client is addedd !'}, {type:'success'})
         setTimeout(()=>{
          location.reload()
         },1800)
        }else{
            Notification({text:'Client is not adedd !!!'}, {type:'danger'})
        }
    }).catch(err =>{
        console.log(err)
    })
}


</script>

<style scoped lang='scss'>
$blue-color: #435ebe;
$input_bg: #edf2f7;
.title{
    text-align: center;
}

  Form {
    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 50%;
      position: relative;
    }

    textarea,
    select,
    input {
      width: 100%;
      font-weight: 400;
      font-size: 14px;
      height: 45px;
      padding-left: 15px;
      color: #272a2c;
      background: $input_bg;
      border-radius: 5px;
      outline: none;
      margin-right: 5px;
      border: none;
      margin-top: 12px;
    }
    p {
      color: red;
    }
    button{
        width: 100%;
        padding: 6px 0;
        color: white;
        border: none;
        border-radius: 5px;
        background: $blue-color;
        margin: 15px 15px 15px 0; 
    }
  }
  .flex__div{
    display: flex;
    justify-content: flex-end;
}
</style>