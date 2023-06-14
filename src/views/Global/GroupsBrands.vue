<template>
  <section>
    <appModal v-model="dialog">
      <h3>Add Group</h3>
      <Form>
        <label for="name">Name</label>
        <Field
          rules="required"
          :modelValue="form.group"
          v-slot="{ errors }"
          name="Group name"
        >
          <div class="Login__form-input">
            <input id="password" placeholder="Name" type=" text" v-model="form.group" />
          </div>
          <p class="login__input-error" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <div class="flex_div">
          <button @click="addGroup">Add</button>
        </div>
      </Form>
    </appModal>
    <appModal v-model="dialog2">
      <h3>Add Brand</h3>
      <Form>
        <label for="name">Name</label>
        <Field
          rules="required"
          :modelValue="form.brand"
          v-slot="{ errors }"
          name="Brand name"
        >
          <div class="Login__form-input">
            <input id="password" placeholder="Name" type=" text" v-model="form.brand" />
          </div>
          <p class="login__input-error" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <div class="flex_div">
          <button @click="addBrand">Add</button>
        </div>
      </Form>
    </appModal>
    <appModal v-model="dialog3">
      <h2>Dou you want delete ?</h2>
    <div class="flex__div">
      <button @click="dialog3 = false" class="btn_sure">No</button>
      <button @click="sureDelete" class="btn_sure1">Yes</button>
    </div>
    </appModal>
    <appModal v-model="dialog4">
      <h2>Dou you want delete ?</h2>
    <div class="flex__div">
      <button @click="dialog4 = false" class="btn_sure">No</button>
      <button @click="yesDelete" class="btn_sure1">Yes</button>
    </div>
    </appModal>
    <router-link class="main_group__link" to="/product">
      <span class="groups_link">Back</span>
    </router-link>
    <aside class="main_div_fortable">
      <div class="group">
        <h2>Groups</h2>
        <appTable :headers="headersOfGroup" :body="$store.state.groups">
          <template #body_action="{ item }">
            <button class="delete" @click="deleteGroup(item)">Delete</button>
          </template>
        </appTable>
        <div class="create__btn_div">
          <button @click="openGroupModal" class="create">Create</button>
        </div>
      </div>
      <div class="brand">
        <h2>Brands</h2>
        <appTable :headers="headersOfBrand" :body="$store.state.brands">
          <template #body_action="{ item }">
            <button class="delete" @click="deleteBrand(item)">Delete</button>
          </template>
        </appTable>
        <div class="create__btn_div">
          <button @click="openBrandModal" class="create">Create</button>
        </div>
      </div>
    </aside>
  </section>
</template>

<script setup>
// import {useRouter} from "vue-router"
import { Form, Field } from "vee-validate";
import store from "@/store";

import { ref, onMounted } from "vue";
// const router = useRouter()
import appModal from "@/components/ui/app-modal";
import Notification from "../../plugins/Notification";

const params = ref({
  per_page: 10,
  page: 1,
});

import appTable from "@/components/ui/app-table";
import http from "../../plugins/axios";
const dialog = ref(false);
const dialog2 = ref(false);
const dialog3 = ref(false);
const dialog4 = ref(false);
const form = ref({
  group: "",
  brand: "",
});

onMounted(() => {
  store.dispatch("getGroups", params?.value);
  store.dispatch("getBrands", params?.value);
});
const headersOfGroup = ref([
  { title: "No", value: "index" },
  { title: "Name", value: "title" },
  { title: "Action", value: "action" },
]);
const headersOfBrand = ref([
  { title: "No", value: "index" },
  { title: "Name", value: "title" },
  { title: "Action", value: "action" },
]);
let brand = ref({})

const deleteBrand = (item) => {
  brand.value = item
  dialog3.value = !dialog3.value

  // http
  //   .delete(`/api/warehouse/brand/${item.id}/`)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // console.log(item.id)
};

const sureDelete =()=>{
  
  http
    .delete(`/api/warehouse/brand/${brand.value.id}/`)
    .then((res) => {
      console.log(res);
      if(res.status === 204){
       Notification({text:'Brand is deleted'}, {type:'success'})
       setTimeout(()=>{
        location.reload()
       },2100)
      }else{
       Notification({text:'Brand is not deletedn !!!'}, {type:'danger'})

      }
    })
    .catch((err) => {
      console.log(err);
    });
}
const yesDelete =()=>{
  
  http
    .delete(`/api/warehouse/group/${group.value.id}/`)
    .then((res) => {
      console.log(res);
      if(res.status === 204){
       Notification({text:'Group is deleted'}, {type:'danger'})
       setTimeout(()=>{
        location.reload()
       },2100)
      }else{
       Notification({text:'Group is not deletedn !!!'}, {type:'warning'})

      }
    })
    .catch((err) => {
      console.log(err);
    });
}
const group = ref({})
const deleteGroup = (item) => {
  group.value = item
  dialog4.value = !dialog4.value
  // http
  //   .delete(`/api/warehouse/group/${item.id}/`)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // console.log(item.id)
};

const openGroupModal = () => {
  dialog.value = !dialog.value;
};
const openBrandModal = () => {
  dialog2.value = !dialog2.value;
};
const addGroup = () => {
  http
    .post("/api/warehouse/group/", {
      title: form.value.group,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
const addBrand = () => {
  http
    .post("/api/warehouse/brand/", {
      title: form.value.brand,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped lang="scss">
$blue-color: #435ebe;
$white-color: #fff;
$input_bg: #edf2f7;

.main_group__link {
  margin: 25px 0 20px 20px;
  display: block;

  .groups_link {
    padding: 7px 12px;
    border: none;
    border-radius: 5px;
    color: white;
    background: $blue-color;
    text-decoration: none;
    list-style: none;
  }
}
.flex_div {
  display: flex;
  justify-content: flex-end;
  button {
    border: none;
    border-radius: 5px;
    width: 100px;
    padding: 7px 0;
    color: white;
    background: $blue-color;
  }
}

.main_div_fortable {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding-bottom: 30px;
}
.group,
.brand {
  text-align: center;
}
.delete {
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  color: white;
  background: red;
}
.create {
  width: 120px;
  padding: 7px 0;
  border: none;
  border-radius: 5px;
  color: white;
  background: rgb(9, 198, 250);
}
.create__btn_div {
  display: flex;
  justify-content: flex-start;
  margin-left: 15px;
}

Form {
  width: 60%;
  margin: 50px 0;
  display: flex;
  flex-direction: column;

  .Login__form-input {
    width: 100%;
    display: flex;
    align-items: center;
    background: $input_bg;

    %input_act {
      cursor: pointer;
      background: transparent;
      margin-right: 10px;
    }

    .Login__show {
      @extend %input_act;
      display: block;
    }
    .Login__hide {
      @extend %input_act;
      display: none;
    }
  }

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
  }

  .Login__input-error {
    margin-top: 5px;
    color: red;
    font-size: 15px;
    font-weight: 500;
  }

  label {
    margin: 10px 0;
    font-weight: 500px;
    font-size: 16px;
    color: #2c2728;
  }
  button {
    margin-top: 40px;
    border: none;
    padding: 10px 0;
    color: #fff;
    font-size: 16px;
    background: $blue-color;
    border-radius: 5px;
    cursor: pointer;
  }
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
