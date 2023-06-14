<template>
  <section>
    <appOpenModal ref="addInvoiceModal" />
    <div v-if="role !== 'director'" class="flex__div">
      <button @click="openInvoiceModal">Add input invoice</button>
    </div>
    <appTable :headers="headers" :body="body">
      <template #body_supplier="{ item }">
        <span>{{ item.supplier.title }}</span>
      </template>

      <template #body_address="{ item }">
        <span>{{ item.supplier.address }}</span>
      </template>

      <template v-if="role !== 'director'" #body_action="{ item }">
        <router-link :to="{ name: 'innerArrived', params: { id: item?.id } }">
          <span class="product__list-table-text"><i class="fa-solid fa-eye"></i></span>
        </router-link>
        <span v-if="item.status === 'new'" class="inlineSpan"
          ><i class="fa-regular fa-trash-can"></i
        ></span>
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
// import Notification from "../../plugins/Notification";
import appOpenModal from "@/components/pages/AddInvoice";
import appTable from "@/components/ui/app-table";
import VPagination from "@hennge/vue3-pagination";
import http from "../../plugins/axios";
import { ref } from "vue";

let role = ''
const getStore =()=>{
 role = sessionStorage.getItem('role')
}
getStore()
console.log(role , 'role');
const headers = ref([
  { title: "No", value: "index" },
  { title: "Supplier", value: "supplier" },
  { title: "Total sum", value: "total_sum" },
  { title: "Address", value: "address" },
  { title: "Status", value: "status" },
  { title: "Description", value: "description" },
  { title: "Action", value: "action" },
  
]);
const body = ref([]);
const param = ref({
  per_page: 10,
  page: 1,
  last_page: null,
});

const addInvoiceModal = ref();

const getInvoice = () => {
  http
    .get("/api/warehouse/input-invoice/", {
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
getInvoice();

const openInvoiceModal = () => {
  addInvoiceModal.value.openModal();
};
</script>

<style scoped lang="scss">
$blue-color: #435ebe;

.flex__div {
  display: flex;
  justify-content: flex-end;
  button {
    margin: 25px 20px 20px 0;
    border: none;
    border-radius: 5px;
    color: white;
    background: $blue-color;
    width: 140px;
    padding: 7px 0;
  }
}
.inlineSpan {
  display: inline-block;
  margin-left: 15px;
  color: red;
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
