<template>
  <section>
    <clientModal ref="client" />
    <editClient ref="edit" />
    <appModal v-model="dialog">
      <h3 class="title">Are you sure you want to delete ?</h3>
      <div class="modal_div">
        <button @click="cancel" class="cancel">Cancel</button>
        <button @click="deleteBtn" class="delete">Delete</button>
      </div>
    </appModal>
    <div v-if="role !== 'director'" class="header_div">
      <button @click="openClient">Add client</button>
    </div>
    <appTable :headers="headers" :body="$store?.state?.clients">
      <template v-if="role !== 'director'" #body_action="{ item }">
        <!-- <router-link :to="{ name: 'innerArrived', params: { id: item?.id } }"> -->
        <span @click="editModal(item)" class="product__list-table-text eye"
          ><i class="fa-solid fa-pen-to-square"></i
        ></span>
        <!-- </router-link> -->
        <span @click="deleteModal(item)" class="inlineSpan"
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
import appTable from "@/components/ui/app-table";
import VPagination from "@hennge/vue3-pagination";
import appModal from "@/components/ui/app-modal";
import Notification from "../../plugins/Notification";

import clientModal from "@/components/pages/addClients";
import editClient from "@/components/pages/editClient";
import { onMounted, ref } from "vue";
import store from "@/store";
import http from "../../plugins/axios";
const client = ref();
const edit = ref();

let role = ''
const getStore =()=>{
 role = sessionStorage.getItem('role')
}
getStore()
console.log(role , 'role');
const headers = ref([
  { title: "No", value: "index" },
  { title: "Name", value: "title" },
  { title: "Phone number", value: "phone_number" },
  { title: "Address", value: "address" },
  { title: "Action", value: "action" },
]);
const dialog = ref(false);
const param = ref({
  per_page: 10,
  page: 1,
  last_page: null,
});
const cancel = () => {
  dialog.value = false;
};

const getclients = () => {
  http
    .get("/api/sales/client/")
    .then((res) => {
      console.log(res, "bu res");
    })
    .catch((err) => {
      console.log(err);
    });
};

getclients();
const openClient = () => {
  client.value.openModal();
};

onMounted(() => {
  store.dispatch("getClient", param.value);
});

const editModal = (item) => {
  edit.value.openModal(item);
  console.log(item, "bu item");
};
const i = ref(null)
const deleteModal = (item) => {
  dialog.value = !dialog.value;
  i.value = item.id
};
const deleteBtn = () => {
  http.delete(`/api/sales/client/${i.value}/`)
  .then(res =>{
    console.log(res, 'delete')
    if(res.status === 204){
    Notification({text:'Client is deleted !'}, {type:'danger'})
    setTimeout(()=>{
      location.reload()
    },1400)
    }else{
      Notification({text:'Something is wrong'}, {type:'default'})
    }
  }).catch(err =>{
    console.log(err)
  })
};
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
.title {
  text-align: center;
}
.modal_div {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  button {
    border: none;
    border-radius: 5px;
    color: white;
    padding: 7px 13px;
  }
  .cancel {
    background: rgb(0, 200, 255);
  }
  .delete {
    background: rgb(244, 90, 90);
  }
}
</style>
