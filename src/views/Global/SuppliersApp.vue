<template>
  <section>
    <supplierModal ref="supplier" />
    <appModal v-model="dialog">
      <h2>Dou you want delete ?</h2>
      <div class="flex__div">
        <button @click="dialog= false" class="btn_sure">No</button>
        <button @click="sureDelete" class="btn_sure1">Yes</button>
      </div>
    </appModal>
    <div>
      <div class="product__list-table">
        <appTable :headers="headers" :body="$store?.state?.suppliers">
          <template #body_action="{ item }">
            <div class="icon_div">
              <span class="edit" @click="openModalEdit(item)"
                ><i class="fa-solid fa-pen-to-square"></i
              ></span>
              <span @click="deleteSupplier(item)" class="delete"
                ><i class="fa-solid fa-trash-can"></i
              ></span>
            </div>
          </template>
        </appTable>
      </div>
      <aside v-if="role !== 'director'">
        <button class="createBtn" @click="openModal">Create</button>
      </aside>
    </div>
  </section>
</template>

<script setup>
import appTable from "@/components/ui/app-table";
import supplierModal from "@/components/pages/supplierModals.vue";
import appModal from "@/components/ui/app-modal";
import Notification from "../../plugins/Notification";

import { ref } from "vue";
import http from "../../plugins/axios";
const dialog = ref(false);
const supplier = ref();

let role = ''
const getStore =()=>{
 role = sessionStorage.getItem('role')
}
getStore()
console.log(role , 'role');
const headers = ref([
  { title: "No", value: "id" },
  { title: "Name", value: "title" },
  { title: "Credit", value: "credit" },
  { title: "Address", value: "address" },
  { title: "Action", value: "action" },
]);

const openModal = () => {
  supplier.value.openModal();
};

const openModalEdit = (item) => {
  supplier.value.openModal(item);
  console.log(item);
};
const deleteItems = ref({})

const deleteSupplier = (item) => {
  dialog.value = !dialog.value;
  deleteItems.value = item
};
const sureDelete =()=>{
  http.delete(`/api/warehouse/supplier/${deleteItems.value.id}/`)
  .then(res =>{
    console.log(res)
    if(res.status === 204){
      Notification({text:'Supplier is deleted'}, {type:'success'})
      setTimeout(()=>{
        location.reload()
      },2100)
    }else{
      Notification({text:'You have a mistake'}, {type:'danger'})
    }
  }).catch(err =>{
    console.log(err)
  })
}

// const deleteModal = (item) =>{
// supplier.value.deleteModal(item)
// }
</script>

<style scoped lang="scss">
$blue-color: #435ebe;
$white-color: #fff;

.product__list-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: scroll;

  .product__list-table-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #000;
    &:hover {
      color: $blue-color;
      font-size: 13.5px;
    }
  }
}
.createBtn {
  width: 120px;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 0;
  background: $blue-color;
  margin: 25px 0 0 20px;
}
.icon_div {
  display: flex;
  justify-content: space-around;
}
.edit {
  color: blue;
  cursor: pointer;
}
.delete {
  color: red;
  cursor: pointer;
}
.flex__div{
    display: flex;
    justify-content: flex-end;
}
.btn_sure{
  width: 100px;
  border-radius: 5px;
  color: white;
  background: red;
  cursor: pointer;
  border: none;
}
.btn_sure1{
  width: 100px;
  border-radius: 5px;
  color: white;
  background: rgb(111, 250, 111);
  cursor: pointer;
  border: none;
}
</style>
