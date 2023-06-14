<template>
  <section>
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
    <div class="header_div">
      <article>
        <span>{{ singleItems?.supplier?.title }}</span>
        <span>{{ singleItems?.total_sum }}</span>
      </article>
      <button v-if="equal === 'new'" @click="openAddProduct">Add product</button>
    </div>
    <appTable :headers="headers" :body="body">
      <template #body_title="{ item }">
        <span>{{ item.product.title }}</span>
      </template>
      <template #body_code="{ item }">
        <span>{{ item.product.code }}</span>
      </template>
      <template #body_action>
        <span class="eye"><i class="fa-solid fa-pen-to-square"></i></span>
        <span class="inlineSpan"><i class="fa-regular fa-trash-can"></i></span>
      </template>
    </appTable>
    <div class="pagination">
      <VPagination
        v-model="params.page"
        :pages="params.last_page"
        :range-size="1"
        active-color="#eaf5ff"
        @update:modelValue="getSingleProduct"
      />
    </div>
    <div class="footer_div">
      <button  v-if="equal === 'confirmed'" @click="save" class="save1">Back</button>
      <button  v-if="equal === 'new'" @click="save" class="save">Save</button>
      <button  v-if="equal === 'new'" @click="confirm" class="confirm">Confirm</button>
      <button  v-if="equal === 'new'" @click="deleteItem" class="delete">Delete</button>
    </div>
  </section>
</template>

<script setup>
import appTable from "@/components/ui/app-table";
import { Form, Field } from "vee-validate";
import Notification from "../../plugins/Notification";
import VPagination from "@hennge/vue3-pagination";

import store from "@/store";
import appModal from "@/components/ui/app-modal";
let url = window.location.href.split("/");
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import http from "../../plugins/axios";
const params = ref({
  per_page: 10,
  page: 1,
  last_page: null,
});
const router = useRouter();
console.log(url[4], "bu url");
const dialog = ref(false);

const openAddProduct = () => {
  dialog.value = !dialog.value;
};



const form = ref({
  selected_product: "",
  quantity: "",
  price: "",
});

const save = () => {
  router.push("/arrived");
};

onMounted(() => {
  store.dispatch("getInvoiceItem", params?.value);
  store.dispatch("getProduct", params?.value);
});

const headers = ref([
  { title: "No", value: "index" },
  { title: "Product", value: "title" },
  { title: "Code", value: "code" },
  { title: "Price", value: "price" },
  { title: "Quantity", value: "quantity" },
  { title: "Invoice", value: "invoice" },
  { title: "Action", value: "action" },
]);
const singleItems = ref();
const equal =ref('')
const getSingleInvoice = () => {
  http
    .get(`/api/warehouse/input-invoice/${url[4]}`)
    .then((res) => {
      console.log(res);
      singleItems.value = res.data;
      equal.value = res.data.status

    })
    .catch((err) => {
      console.log(err);
    });
};
getSingleInvoice();

const submitForm = () => {
  http
    .post(`/api/warehouse/input-invoice-item/`, {
      product: form.value.selected_product,
      quantity: form.value.quantity,
      price: form.value.price,
      invoice: url[4],
    })
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        Notification({ text: "Product is added" }, { type: "success" });
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const body = ref([]);

const getSingleProduct = () => {
  http
    .get(`/api/warehouse/input-invoice-item/`, {
      params: {
        invoice: url[4],
        per_page: params?.value?.per_page,
        page: params?.value?.page,
      },
    })
    .then((res) => {
      body.value = res.data.results;

      body.value.forEach((item, index) => {
        item.index =
          params.value?.page * params.value?.per_page -
          (params.value?.per_page - 1) +
          index;
      });
      params.value.last_page = Math.ceil(res.data.count / params.value.per_page);
      console.log(res.data.results, "bu kere");
    })
    
    .catch((err) => {
      console.log(err);
    });
};
getSingleProduct();

// const deleteItem = () => {
//  http.delete(`/api/warehouse/input-invoice-item/${url[4]}/`)
//  .then(res =>{
//   console.log(res)
//  }).catch(err =>{
//   console.log(err)
//  })
// };

const confirm =()=>{
  http.post(`/api/warehouse/input-invoice/${url[4]}/confirm/`)
  .then(res =>{
    console.log(res)
    if(res.status === 200){
      router.push('/arrived')
     setTimeout(()=>{
       Notification({text:'Product is confirm'},{type:'warning'})
     },500)
    }
  }).catch(err =>{
    console.log(err)
  })
}
</script>

<style scoped lang="scss">
$blue-color: #435ebe;
$input_bg: #edf2f7;

.header_div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 25px;

  span {
    display: inline-block;
    margin-left: 20px;
    background: transparent;
    color: $blue-color;
    border: 2px solid rgb(187, 217, 233);
    padding: 7px 16px;
    border-radius: 5px;
  }
  button {
    margin-right: 25px;
    color: white;
    border: none;
    border-radius: 5px;
    background: $blue-color;
    padding: 7px 12px;
  }
}

.footer_div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  button {
    width: 120px;
    padding: 8px 0;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    margin-left: 12px;
  }
  .save {
    color: white;
    background: rgb(82, 247, 247);
  }
  .save1 {
    color: white;
    background: $blue-color;
  }
  .delete {
    color: white;
    background: rgb(245, 101, 101);
  }
  .confirm {
    color: white;
    background: $blue-color;
  }
}

.title {
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
.inlineSpan {
  display: inline-block;
  margin-left: 15px;
  color: red;
  cursor: pointer;
}
.eye {
  color: $blue-color;
}
.pagination {
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 0;
}
</style>
