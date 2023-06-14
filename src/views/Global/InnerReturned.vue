<template>
  <section>
    <!-- <editProduct ref="productRef" /> -->
    <openModal ref="open" />
    <div class="header_div">
      <article>
        <span>
          {{ deliveredItem?.client?.title }}
        </span>
        <span>{{ deliveredItem?.total_sum }}</span>
      </article>
      <button v-if="equal === 'new'" @click="addProduct(url[4])">Add product</button>
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
        @update:modelValue="getOutputItem"
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
// import store from "@/store";
// import { Form, Field } from "vee-validate";
import http from "../../plugins/axios";
import appTable from "@/components/ui/app-table";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Notification from "../../plugins/Notification";
// import appModal from "@/components/ui/app-modal";
import VPagination from "@hennge/vue3-pagination";
import openModal from "@/components/pages/addProductReturn";
const url = window.location.href.split("/");
const router = useRouter();
const open = ref();
console.log(url[4]);
const params = ref({
  last_page: null,
  per_page: 10,
  page: 1,
});
const body = ref([]);
const save = () => {
  router.push("/returned");
};
const addProduct = (item) => {
  open.value.openModal(item);
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
const confirm =()=>{
    http.post(`/api/warehouse/returned-invoice/${url[4]}/confirm/`)
    .then(res =>{
        console.log(res, 'confirm')
        if(res.status === 200){
            Notification({text:'Product is confirmed !'}, {type:'warning'})
            setTimeout(()=>{
                router.push('/returned')
            })
        }else{
            Notification({text:'You have a mistake'}, {type:'danger'})
        }
    }).catch(err =>{
        console.log(err)
        if(err){
            Notification({text:'You have a mistake'}, {type:'danger'})

        }
    })
}
const deliveredItem = ref({});
const equal = ref("");
const getOutputItem = () => {
  http
    .get(`/api/warehouse/returned-invoice/${url[4]}/`)
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

const getProduct = () => {
  http
    .get(`/api/warehouse/returned-invoice-item/`, {
      params: {
        invoice: url[4],
        per_page: params.value.per_page,
        page: params.value.page,
      },
    })
    .then((res) => {
      console.log(res, "bu");
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
getProduct();
</script>

<style scoped lang="scss">
$blue-color: #435ebe;
$input_bg: #edf2f7;

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
</style>
