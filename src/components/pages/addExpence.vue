<template>
  <appModal v-model="dialog">
    <Form @submit="formSubmit">
        <h3 class="title">Add expence</h3>
      <label v-if="!visible2" for="name">Select invoice</label>
      <select
        @change="(evt) => handleChange(evt)"
        id="group"
        v-model="form.selected_invoice"
        v-if="!visible2"
      >
        <option value="" disabled selected>Select type</option>
        <option v-for="item in supplier" :key="item?.supplier?.id"  :value="item?.supplier?.id">{{item?.supplier?.title}}</option>
      </select>
      <label v-if="!visible" for="group">Select returned invoice</label>

      <Field
        v-if="!visible"
        rules="required"
        :modelValue="form.selected_return"
        v-slot="{ errors }"
        name="selected_sales"
      >
        <select @change="(evt)=>change(evt)" id="group" v-model="form.selected_return">
          <option value="" disabled selected>Select sales</option>
          <option v-for="item in client" :key="item.id" :value="item?.client?.id">
            {{ item?.client?.title }}
          </option>
        </select>
        <p class="login__input-error" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <label for="login">Amount</label>
      <Field rules="required" :modelValue="form.amount" v-slot="{ errors }" name="Amount">
        <input id="login" placeholder="Amount" type="number" v-model="form.amount" />
        <p class="login__input-error" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
      <label for="login">Description</label>
      <Field rules="required" :modelValue="form.description" v-slot="{ errors }" name="Description">
        <textarea id="login" placeholder="Description" type="number" v-model="form.description" />
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
import { ref, defineExpose, onMounted } from "vue";
import Notification from "../../plugins/Notification";
import store from "@/store";
import http from "../../plugins/axios";
const client = ref([]);
const visible = ref(false)
const visible2 = ref(false)
const dialog = ref(false);
const form = ref({
  amount: "",
  selected_return: null,
  selected_invoice: "",
  title: "",
  description:''
});
const supplier = ref([])
const getArrived =()=>{
    http.get(`/api/warehouse/input-invoice`)
    .then(res =>{
        console.log(res, 'invoice')
        supplier.value = res.data.results
    }).catch(err =>{
        console.log(err)
    })
}
getArrived()

onMounted(() => {
  store.dispatch("getClient");
  store.dispatch("getSuppliers");
});
const getSales = () => {
  http
    .get(`/api/warehouse/output-invoice/`)
    .then((res) => {
      client.value = res.data.results;
      console.log(res, "bu res");
    })
    .catch((err) => {
      console.log(err);
    });
};

getSales();
const openModal = () => {
  dialog.value = !dialog.value;
};
defineExpose({ openModal });
const handleChange = (evt) => {
 if(evt.target.value){
  visible.value = true
 }
};
const change =(evt)=>{
 if(evt.target.value){
  visible2.value = true
 }
}

const formSubmit =()=>{
    http.post(`/api/finance/expense/`,{
        invoice: form.value.selected_invoice,
        returned_invoice: form.value.selected_return,
        amount: form.value.amount,
        description: form.value.description
    }).then(res =>{
        console.log(res,'expence')
        if(res.status === 201){
          Notification({text:'Expence is adedd!'},{type:'success'})
          setTimeout(()=>{
            location.reload()
          },1500)
        }else{
            Notification({text:'Expence is not adedd !!!'},{type:'danger'})
        }
    }).catch(err =>{
        console.log(err)
        if(err){
            Notification({text:'You have a mistake !'},{type:'danger'})
        }
    })
}
</script>

<style scoped lang="scss">
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
  h3{
    text-align: center;
  }
  button {
    width: 100%;
    padding: 6px 0;
    color: white;
    border: none;
    border-radius: 5px;
    background: $blue-color;
    margin: 15px 15px 15px 0;
  }
}
.flex__div {
  display: flex;
  justify-content: flex-end;
}
</style>
