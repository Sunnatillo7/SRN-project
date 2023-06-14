<template>
  <section>
    <returnModal ref="open" />
    <div v-if="role !== 'director'" class="header_div">
      <button @click="addReturn">Add return invoice</button>
    </div>
    <appTable :headers="headers" :body="$store?.state?.returned">
      <template #body_title="{ item }">
        <span>{{ item?.client?.title }}</span>
      </template>
      <template #body_phone_number="{ item }">
        <span>{{ item?.client?.phone_number }}</span>
      </template>
      <template #body_address="{ item }">
        <span>{{ item?.client?.address }}</span>
      </template>
      <template v-if="role !== 'director'" #body_action="{ item }">
        <router-link :to="{ name: 'innerReturned', params: { id: item?.id } }">
          <span class="product__list-table-text"><i class="fa-solid fa-eye"></i></span>
        </router-link>
        <span v-if="item.status === 'new'" class="inlineSpan"
          ><i class="fa-regular fa-trash-can"></i
        ></span>
      </template>
    </appTable>
  </section>
</template>

<script setup>
import appTable from "@/components/ui/app-table";
import { onMounted, ref } from "vue";
// import VPagination from "@hennge/vue3-pagination";
import store from "@/store";
import returnModal from "@/components/pages/ReturnInvoiceModal";

let role = ''
const getStore =()=>{
 role = sessionStorage.getItem('role')
}
getStore()
console.log(role , 'role');
const open = ref();
const headers = ref([
  { title: "No", value: "index" },
  { title: "Client", value: "title" },
  { title: "Phone number", value: "phone_number" },
  { title: "Address", value: "address" },
  { title: "Status", value: "status" },
  { title: "Total sum ", value: "total_sum" },
  { title: "Description", value: "description" },
  { title: "Action", value: "action" },
]);
const param = ref({
  per_page: 10,
  page: 1,
  last_page: null,
});
const addReturn =()=>{
  open.value.openModal()
}

onMounted(() => {
  store.dispatch("getReturnedInvoice", param?.value);
});
</script>

<style scoped lang="scss">
$blue-color: #435ebe;
$input_bg: #edf2f7;

.inlineSpan {
  display: inline-block;
  margin-left: 15px;
  color: red;
  cursor: pointer;
}
.eye {
  color: $blue-color;
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
</style>
