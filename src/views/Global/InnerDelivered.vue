<template>
  <section>
    <editProduct ref="productRef" />
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
        <span>
          {{ deliveredItem?.client?.title }}
        </span>
        <span>{{ deliveredItem?.total_sum }}</span>
      </article>
      <button v-if="equal === 'new'" @click="openProduct">Add product</button>
    </div>
    <appTable :headers="headers" :body="body">
      <template #body_title="{ item }">
        <span>{{ item?.product?.title }}</span>
      </template>
      <template #body_code="{ item }">
        <span>{{ item?.product?.code }}</span>
      </template>

      <template #body_action="{ item }">
        <span @click="openModal(item)" class="eye"
          ><i class="fa-solid fa-pen-to-square"></i
        ></span>
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
      <button v-if="equal === 'confirmed'" @click="save" class="save1">Back</button>
      <button v-if="equal === 'new'" @click="save" class="save">Save</button>
      <button v-if="equal === 'new'" @click="confirm" class="confirm">Confirm</button>
      <button v-if="equal === 'new'" class="delete">Delete</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import store from "@/store";
import { Form, Field } from "vee-validate";
import http from "../../plugins/axios";
import appTable from "@/components/ui/app-table";
import { useRouter } from "vue-router";
import Notification from "../../plugins/Notification";
import appModal from "@/components/ui/app-modal";
import VPagination from "@hennge/vue3-pagination";
const url = window.location.href.split("/");
import editProduct from "@/components/pages/editProduct";
const router = useRouter();
const params = ref({
  page: 1,
  per_page: 10,
  last_page: null,
});
const form = ref({
  selected_product: "",
  price: "",
  quantity: "",
});
const productRef = ref();
const dialog = ref(false);
const openModal = (item) => {
  productRef.value.openModal(item);
};

onMounted(() => {
  store.dispatch("getClient");
  store.dispatch("getProduct");
});
const confirm = () => {
  http.post(`/api/warehouse/output-invoice/${url[4]}/confirm/`)
  .then(res =>{
    console.log(res)
    if(res.status === 200){
      Notification({text:'Product is confirmed !'}, {type:'warning'})
    }else{
      Notification({text:'Product already has been confirmed'}, {type:'default'})
    }
  }).catch(err =>{
    console.log(err)
    if(err){
      Notification({text:'Product already has been confirmed'}, {type:'default'})
    }
  })
};
const deliveredItem = ref({});
const equal = ref("");
const getOutputItem = () => {
  http
    .get(`/api/warehouse/output-invoice/${url[4]}`, {
      //  params:{
      //    invoice: url[4]
      //  }
    })
    .then((res) => {
      console.log(res.data, "bu res");
      deliveredItem.value = res.data;
      equal.value = res.data.status;
    })
    .catch((err) => {
      console.log(err);
    });
};
getOutputItem();
console.log(url[4]);
const save = () => {
  router.push("/delivered");
};
const openProduct = () => {
  dialog.value = !dialog.value;
};

const submitForm = () => {
  http
    .post(`/api/warehouse/output-invoice-item/`, {
      invoice: url[4],
      product: form.value.selected_product,
      quantity: form.value.quantity,
      price: form.value.price,
    })
    .then((res) => {
      if (res.status === 201) {
        Notification({ text: "Product is added" }, { type: "success" });
        setTimeout(() => {
          location.reload();
        }, 1800);
      }
      console.log(res, "bu item invoice");
    })
    .catch((err) => {
      console.log(err);
    });
};

const headers = ref([
  { title: "No", value: "index" },
  { title: "Product", value: "title" },
  { title: "Code", value: "code" },
  { title: "Price", value: "price" },
  { title: "Quantity", value: "quantity" },
  { title: "Invoice", value: "invoice" },
  { title: "Action", value: "action" },
]);
const body = ref([]);
const getInvoiceItem = () => {
  http
    .get(`/api/warehouse/output-invoice-item/`, {
      params: {
        invoice: url[4],
        per_page: params.value.per_page,
        page: params.value.page,
      },
    })
    .then((res) => {
      body.value = res.data.results;

      body.value.forEach((item, index) => {
        item.index =
          params?.value?.page * params?.value?.per_page -
          (params?.value?.per_page - 1) +
          index;
      });
      params.value.last_page = Math.ceil(res.data.count / params?.value?.per_page);
    })
    .catch((err) => {
      console.log(err);
    });
};
getInvoiceItem();
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
  .save1 {
    color: white;
    background: $blue-color;
  }
  .save {
    color: white;
    background: rgb(109, 247, 247);
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
.pagination {
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 0;
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
