<template>
  <appModal v-model="dialog">
    <h3 class="title">Add input invoice</h3>
  <Form @submit="submitForm">
       <label for="name">Select supplier</label>
       <select id="group" v-model="form.selected_supplier">
        <option value="" disabled selected>Select supplier</option>
        <option v-for="item in $store?.state?.suppliers" :key="item" :value="item.id">
          {{ item.title }}
        </option>
      </select>
        <label for="description">Description</label>
      <Field
        rules="required"
        :modelValue="form.description"
        v-slot="{ errors }"
        name="Description"
      >
        <div class="Login__form-input">
          <textarea
            name="Description"
            id="description"
            cols="30"
            rows="2"
            v-model="form.description"
          >
          </textarea>
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
import http from "../../plugins/axios";
import Notification from "../../plugins/Notification";
import { ref, defineExpose } from "vue";
import {useRouter} from 'vue-router'
const dialog = ref(false);
const router = useRouter()

const form = ref({
    selected_supplier:'',
    description:''
})
// const id = ref(null)

const openModal = (item)=>{
    dialog.value = !dialog.value
    console.log(item, 'bu item')
}

defineExpose({openModal})

// const getInvoice = ()=>{
//   http.get('api/warehouse/input-invoice/').then(res =>{
//     console.log(res.data.results, 'shuni tanla')

//   }).catch(err =>{
//     console.log(err)
//   })
// }
// getInvoice()

const submitForm =()=>{
 http.post(`/api/warehouse/input-invoice/`,{
    supplier: form.value.selected_supplier,
    description: form.value.description
 }).then(res =>{
  console.log(res)
    if(res.status === 201){
    Notification({text:'Invoice is added !'}, {type:'success'})
    setTimeout(()=>{
        // location.reload()
        router.push(`/innerArrived/${res.data.id}` )
    },2050)
    }else{
        Notification({text:'Invoice is not addedd!'}, {type :'danger'})
    }
    console.log(res)
 }).catch(err =>{
    console.log(err)
 })
}

</script>

<style scoped lang='scss'>
$blue-color: #435ebe;
$input_bg: #edf2f7;

// .main {
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   align-items: center;
//   h3 {
//     text-align: center;
//   }

// }
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
   
  }
  .flex__div{
    display: flex;
    justify-content: center;

     button{
        width: 80%;
        padding: 6px 0;
        color: white;
        border: none;
        border-radius: 5px;
        background:$blue-color;
        margin: 15px 15px 15px 0; 
    }
}

</style>