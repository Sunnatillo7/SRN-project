<template>
    <appModal v-model="dialog">
      <h3 class="title">Add product</h3>
      <Form @submit="submitForm">
        <label for="name">Select product</label>
        <select id="group" v-model="form.selected_product">
          <option value="" disabled selected>Select product</option>
          <option v-for="item in $store?.state?.product" :key="item" :value="item.id">
            {{ item.title }}
          </option>
        </select>
        <label for="login">Quantity</label>
        <Field
          rules="required"
          :modelValue="form.quantity"
          v-slot="{ errors }"
          name="Quantity"
        >
          <input
            id="login"
            placeholder="Quantity"
            type="number"
            v-model="form.quantity"
          />
          <p class="login__input-error" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <label for="login">Price</label>
        <Field rules="required" :modelValue="form.price" v-slot="{ errors }" name="Price">
          <input id="login" placeholder="Price" type="number" v-model="form.price" />
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
import Notification from "../../plugins/Notification";
import { ref, defineExpose, onMounted } from "vue";
import store from '@/store'
import http from "../../plugins/axios";
// import {useRouter} from 'vue-router'
const dialog = ref(false);
// const router = useRouter()
const form =ref({
    quantity:'',
    selected_product:'',
    price:''
})
const id = ref(null)

const openModal =(item)=>{
    dialog.value = !dialog.value
    id.value = item
}
defineExpose({openModal})
onMounted(() => {
  store.dispatch("getClient");
  store.dispatch("getProduct");
});

const submitForm =()=>{
    http.post(`/api/warehouse/returned-invoice-item/`,{
        product: form.value.selected_product,
        quantity: form.value.quantity,
        price: form.value.price,
        invoice: id.value
    }).then(res =>{
        console.log(res, 'bu res')
        if(res.status === 201){
             Notification({text:'Product is adedd'}, {type:'success'})
             setTimeout(()=>{
                location.reload()
             },1700)
        }else{
            Notification({text:'Please try again !'}, {type:'danger'})
        }
    }).catch(err =>{
        console.log(err)
    })
}
</script>

<style scoped lang='scss'>
$blue-color: #435ebe;
$input_bg: #edf2f7;


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
.flex__div {
  display: flex;
  justify-content: center;

  button {
    width: 80%;
    padding: 6px 0;
    color: white;
    border: none;
    border-radius: 5px;
    background: $blue-color;
    margin: 15px 15px 15px 0;
  }
}
</style>