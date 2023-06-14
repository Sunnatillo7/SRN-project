<template>
<div>
    <appModal class="main" v-model="dialog" width='"40%"'>
    <div class="Login__item">
      <h3 v-if="i" >Edit supplier</h3>
      <h3 v-else>Add supplier</h3>
      <Form @submit="send">
        <label for="name">Supplier name</label>
        <Field
          rules="required"
          :modelValue="form.title"
          v-slot="{ errors }"
          name="Supplier name"
        >
          <div class="Login__form-input">
            <input id="password" placeholder="Name" type=" text" v-model="form.title" />
          </div>
          <p class="login__input-error" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <label for="address">Address</label>
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
        <button type="submit" v-if="i">Edit supplier</button>
        <button type="submit" v-else>Add supplier</button>
      </Form>
    </div>
  </appModal>

  <!-- <appModal class="main" v-model="dialog2">
    <h2>Do you want to delete this supplier</h2>
    <div>
      <button @click="sure = true">Yes</button>
      <button @click="sure = false">No</button>
    </div>
  </appModal> -->
</div>


</template>

<script setup>
import appModal from "@/components/ui/app-modal";
import { Form, Field } from "vee-validate";
import { ref,defineExpose , watch} from "vue";
import Notification from "../../plugins/Notification";

import http from "../../plugins/axios";
const dialog = ref(false);
// const dialog2 = ref(false);
const i = ref(null)

const form = ref({
  title: "",
  address: "",
});

const openModal = (item) => {
  if (item && item.id) {
    form.value = {...item};
    i.value = item.id
  }else if(!item){
    dialog.value = !dialog.value
  }
  dialog.value = true

};
watch(dialog,(value)=>{
  if(!value){
   i.value = null
   form.value.address=""
   form.value.title=""
  }
})

const send = ()=>{
  if(i.value){
    http.put(`/api/warehouse/supplier/${i.value}/`,{
      title: form.value.title,
      address: form.value.address
    }).then(res =>{
      console.log(res)
      if(res.status === 200){
        Notification({text: 'Supplier is changed'}, {type:'success'})
        setTimeout(()=>{
          location.reload()
        },2100)
      }else{
        Notification({text: 'You have a mistake'}, {type:'danger'})

      }
    }).catch(err =>{
      console.log(err)
    })
  }else if(!i.value){
    http.post('/api/warehouse/supplier/',{
      title : form.value.title,
      address : form.value.address
    }).then(res =>{
      console.log(res)
      if(res.status === 201){
        Notification({text:'Supplier is added'}, {type : "success"})
        setTimeout(()=>{
        location.reload()

        },2100)
      }else{
        Notification({text:'You have a mistake'}, {type : "danger"})
      }
    }).catch(err =>{
      console.log(err)
    })
  }
}

// const deleteModal = (item)=>{
//   dialog2.value = true
//   // if(item.id){
//   //   http.delete(`/api/warehouse/supplier/${item.id}/`).then(res =>{
//   //     console.log(res)
//   //     if(res.status === 204){
//   //       Notification({text:'Supplier is deleted'}, {type:'success'})
//   //       setTimeout(()=>{
//   //         location.reload()
//   //       },2100)
//   //     }else{
//   //       Notification({text:"You have a mistake!!"}, {type:'danger'})
//   //     }
//   //   }).catch(err =>{
//   //     console.log(err)
//   //   })
//   // }
//   console.log(item.id)
// }


defineExpose({openModal, })
</script>

<style scoped lang="scss">
$blue-color: #435ebe;
$input_bg: #edf2f7;

.main{
  
}
.Login__item {
  width: 60%;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;

  h1 {
    font-weight: 600;
    font-size: 30px;
    color: #272a2c;
    margin: 20px auto;
  }

  Form {
    width: 60%;
    margin: 50px 0;
    display: flex;
    flex-direction: column;

    .Login__form-input {
      width: 100%;
      display: flex;
      align-items: center;
      background: $input_bg;

      %input_act {
        cursor: pointer;
        background: transparent;
        margin-right: 10px;
      }

      .Login__show {
        @extend %input_act;
        display: block;
      }
      .Login__hide {
        @extend %input_act;
        display: none;
      }
    }

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
    }

    .Login__input-error {
      margin-top: 5px;
      color: red;
      font-size: 15px;
      font-weight: 500;
    }

    label {
      margin: 10px 0;
      font-weight: 500px;
      font-size: 16px;
      color: #2c2728;
    }
    button {
      margin-top: 40px;
      border: none;
      padding: 10px 0;
      color: #fff;
      font-size: 16px;
      background: $blue-color;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>
