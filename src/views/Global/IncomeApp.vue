<template>
  <section>
    <openMod ref="addModal"/>
    <div v-if="role !== 'director'" class="header_div">
      <button @click="openModal">Add income</button>
    </div>
    <appTable :headers="headers" :body="body"> </appTable>
    <div class="pagination">
      <VPagination
        v-model="param.page"
        :pages="param.last_page"
        :range-size="1"
        active-color="#eaf5ff"
        @update:modelValue="income"
      />
    </div>
  </section>
</template>

<script setup>
import appTable from "@/components/ui/app-table";
import { onMounted, ref } from "vue";
import VPagination from "@hennge/vue3-pagination";
import openMod from '@/components/pages/AddIncome'
// import appModal from "@/components/ui/app-modal";
// import Notification from "../../plugins/Notification";
import store from "@/store";
import http from "../../plugins/axios";
const addModal = ref()

let role = ''
const getStore =()=>{
 role = sessionStorage.getItem('role')
}
getStore()
console.log(role , 'role');
const param = ref({
  per_page: 10,
  page: 1,
  last_page: null,
});
const body = ref([]);
onMounted(() => {
  store.dispatch("getIncome", param?.value);
});
const income = () => {
  http
    .get(`/api/finance/income/`, {
      params: {
        per_page: param?.value?.per_page,
        page: param?.value?.page,
      },
    })
    .then((res) => {
      console.log(res);
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
income()
const openModal =()=>{
  addModal.value.openModal()
}

const headers = ref([
  { title: "No", value: "index" },
  { title: "Income type", value: "income_type" },
  { title: "Invoice", value: "invoice" },
  { title: "Amount", value: "amount" },
]);
</script>

<style scoped lang="scss">
$blue-color: #435ebe;

.header_div {
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
.pagination {
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 0;
}
</style>
