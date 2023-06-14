<template>
  <section>
  <appModal v-model="dialog">
    <h3 class="title">Add input invoice</h3>
  <Form @submit="submitForm">
       <label for="name">Select client</label>
       <select id="group" v-model="form.selected_client">
        <option value="" disabled selected>Select client</option>
        <option v-for="item in $store?.state?.clients" :key="item" :value="item.id">
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
    <div v-if="role !== 'director'" class="header_div">
      <button @click="addOutput">Add output invoice</button>
    </div>
    <appTable :headers="header" :body="body">
      <template #body_title="{ item }">
        <span>{{ item?.client?.title }}</span>
      </template>
      <template #body_address="{ item }">
        <span>{{ item?.client?.address }}</span>
      </template>
      <template #body_phone_number="{ item }">
        <span>{{ item?.client?.phone_number }}</span>
      </template>
      <template v-if="role !== 'director'" #body_action="{ item }">
        <router-link :to="{ name: 'innerDelivered', params: { id: item?.id } }">
          <span class="product__list-table-text eye"
            ><i class="fa-solid fa-eye"></i
          ></span>
        </router-link>
        <span v-if="item.status === 'new'" class="inlineSpan"><i class="fa-regular fa-trash-can"></i></span>
      </template>
    </appTable>
        <div class="pagination">
      <VPagination
        v-model="param.page"
        :pages="param.last_page"
        :range-size="1"
        active-color="#eaf5ff"
        @update:modelValue="getInvoice"
      />
    </div>
  </section>
</template>

<script setup>
import appTable from "@/components/ui/app-table";
import { ref, onMounted } from "vue";
import http from "../../plugins/axios";
import VPagination from "@hennge/vue3-pagination";
import appModal from "@/components/ui/app-modal";
import { Form, Field } from "vee-validate";
import store from '@/store'
import Notification from "../../plugins/Notification";
import {useRouter} from 'vue-router'
const router = useRouter()

let role = ''
const getStore =()=>{
 role = sessionStorage.getItem('role')
}
getStore()
console.log(role , 'role');
onMounted(()=>{
 store.dispatch('getClient', param?.value)
})
const body = ref([]);
const dialog = ref(false)
const header = ref([
  { title: "No", value: "index" },
  { title: "Client", value: "title" },
  { title: "Total sum", value: "total_sum" },
  { title: "Address", value: "address" },
  { title: "Phone", value: "phone_number" },
  { title: "Status", value: "status" },
  { title: "Discription", value: "description" },
  { title: "Action", value: "action" },
]);
const param = ref({
  per_page: 10,
  page: 1,
  last_page: null,
});
const form = ref({
  selected_client:'',
  description:''
})

const getOutputInvoice = () => {
  http
    .get("/api/warehouse/output-invoice/", {
      params: {
        per_page: param?.value?.per_page,
        page: param?.value?.page,
      },
    })
    .then((res) => {
      body.value = res.data.results;

      body.value.forEach((item, index) => {
        item.index =
          param?.value.page * param?.value.per_page - (param?.value.per_page - 1) + index;
      });
      param.value.last_page = Math.ceil(res?.data?.count / param.value.per_page);
    })
    .catch((err) => {
      console.log(err);
    });
};
getOutputInvoice();


const addOutput =()=>{
  dialog.value = !dialog.value
}


const submitForm =()=>{
  http.post(`/api/warehouse/output-invoice/`,{
    client: form.value.selected_client,
    description: form.value.description
  }).then(res =>{
    console.log(res, 'bu res kere')
    if(res.status === 201){
       router.push(`/innerDelivered/${res.data.id}`)
       setTimeout(()=>{
        Notification({text:'Output is adedd'}, {type:'success'})
       },500)
    }else{
      Notification({text:'You have a mistake'},{type:'danger'})
    }
  }).catch(err =>{
    console.log(err)
  })
}
</script>

<style scoped lang="scss">
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

.header_div {
  display: flex;
  justify-content: flex-end;

  button {
    margin: 20px 25px 20px 0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    background: $blue-color;
    padding: 7px 15px;
  }
}

.inlineSpan {
  display: inline-block;
  margin-left: 15px;
  color: red;
  cursor: pointer;
}
.eye {
  color: $blue-color;
  cursor: pointer;
}
.pagination {
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 0;
}
</style>
