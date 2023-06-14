<template>
  <section class="main">
   <appModal class="main_modal" v-model="dialog" :width="'40%'">
    <h3>Add product</h3>
    <Form @submit="send">
      <div class="modal__form-change-img">
        <label for="file"> Image</label>
        <input type="file" ref="file" id="file" @change="(evt) => handleChange(evt)" />
      </div>
      <label for="name">Product name</label>
      <Field
        rules="required"
        :modelValue="form.title"
        v-slot="{ errors }"
        name="Product name"
      >
        <div class="Login__form-input">
          <input
            id="password"
            placeholder="Product name"
            type=" text"
            v-model="form.title"
          />
        </div>
        <p class="login__input-error" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
      <label for="name">Product code</label>
      <Field
        rules="required"
        :modelValue="form.code"
        v-slot="{ errors }"
        name="Product code"
      >
        <div class="Login__form-input">
          <input
            id="password"
            placeholder="Product name"
            type=" text"
            v-model="form.code"
          />
        </div>
        <p class="login__input-error" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
      <label for="name">Arrival price</label>
      <Field
        rules="required"
        :modelValue="form.current_arrival_price"
        v-slot="{ errors }"
        name="Arrival price"
      >
        <div class="Login__form-input">
          <input
            id="password"
            placeholder="Arrival price"
            type=" text"
            v-model="form.current_arrival_price"
          />
        </div>
        <p class="login__input-error" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
      <label for="name">Selling price</label>
      <Field
        rules="required"
        :modelValue="form.current_selling_price"
        v-slot="{ errors }"
        name="Selling price"
      >
        <div class="Login__form-input">
          <input
            id="password"
            placeholder="Selling price"
            type=" text"
            v-model="form.current_selling_price"
          />
        </div>
        <p class="login__input-error" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      

      <select id="group" v-model="form.selected_group">
        <option value="" disabled selected>Select group</option>
        <option v-for="item in array_group" :key="item" :value="item.id">
          {{ item.title }}
        </option>
      </select>
      <select v-model="form.selected_brand">
        <option value="" disabled selected>Select your brand</option>
        <option v-for="item in array_brand" :key="item" :value="item.id">
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
  <appModal v-model="dialog2">
    <h2>Dou you want delete ?</h2>
    <div class="flex__div">
      <button @click="dialog2 = false" class="btn_sure">No</button>
      <button @click="sureDelete" class="btn_sure1">Yes</button>
    </div>
  </appModal>
    <div class="single__img">
      <img :src="singleItems?.image" alt="image" />
    </div>
    <div class="second__div">
      <h2>{{ singleItems?.title }}</h2>
      <div>
        <span class="single__group">Group :</span>
        <span v-for="item in singleItems" :key="item.id">{{ item?.title }}</span>
      </div>
      <div>
        <span class="single__group">Brand :</span>
        <span v-for="item in singleItems" :key="item.id">{{ item?.title }}</span>
      </div>
      <div>
        <span class="single__group">Price :</span>
        <span>{{ singleItems?.current_selling_price }}</span>
      </div>
      <div>
        <span class="single__group">Code :</span>
        <span>{{ singleItems?.code }}</span>
      </div>
      <div>
        <span class="single__group">Description :</span>
        <p>
          {{ singleItems?.description }}
        </p>
      </div>
      <div>
        <button class="single__edit" @click="openEdit">Edit</button>
        <button class="single__delete" @click="openDelete">Delete</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import http from "../../plugins/axios";
import appModal from "@/components/ui/app-modal";
import { Form, Field } from "vee-validate";
import Notification from "../../plugins/Notification";



let url = window.location.href.split("/");
const singleItems = ref([]);
const dialog = ref(false)
const array_group = ref([])
const array_brand = ref([])
const dialog2 = ref(false)

const form = ref({
  title: "",
  image: "",
  code: "",
  current_arrival_price: "",
  current_selling_price: "",
  selected_group: "",
  selected_brand: "",
  description: "",
});
console.log(singleItems.value)

const getSingleProduct = () => {
  http
    .get(`/api/warehouse/product/${url[4]}`)
    .then((res) => {
      console.log(res.data);
      singleItems.value = res?.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

getSingleProduct();
const sureDelete =() =>{
  http.delete(`/api/warehouse/product/${url[4]}`)
  .then(res =>{
    console.log(res)
    if(res.status === 204){
     Notification({ text: "Product is deleted" }, { type: "danger" });
     setTimeout(()=>{
      location.reload()
     },2100)
    }else{
       Notification({ text: "You have a mistake" }, { type: "warning" });
    }
  }).catch(err =>{
    console.log(err)
  })
}
const openDelete =()=>{
  dialog2.value = !dialog2.value
}
const handleChange = (evt) => {
  form.value.image = evt.target.files[0];
};

const openEdit =()=>{
 dialog.value = !dialog.value
 form.value = {...singleItems.value}
}
const getBrand = ()=>{
    http.get('/api/warehouse/brand/').then(res =>{
        console.log(res)
        array_brand.value = res?.data?.results
    }).catch(err =>{
        console.log(err)
    })
}
getBrand()
const getGroup = ()=>{
    http.get('/api/warehouse/group/').then(res =>{
        console.log(res)
        array_group.value = res.data.results
    }).catch(err =>{
        console.log(err)
    })
}
getGroup()

const send = () => {
  const form2 = new FormData();
  form2.append("title", form.value.title );
  form2.append("code", form.value.code );
  form2.append("current_arrival_price", form.value.current_arrival_price );
  form2.append("current_selling_price", form.value.current_selling_price );
  form2.append("group", form.value.selected_group);
  form2.append("brand", form.value.selected_brand );
  form2.append("description", form.value.description);
  form2.append("image", form.value.image );
  
  http.put(`/api/warehouse/product/${url[4]}/`, form2,{
     headers: {
        "Content-Type": "multipart/form-data",
      },
  })
  .then(res =>{
    console.log(res)
         if (res.status === 200) {
            Notification({ text: "Product is changed" }, { type: "success" });
      setTimeout(() => {
        location.reload();
      }, 2100);
         }else{
             Notification({ text: "You have a mistake" }, { type: "danger" });
         }
  }).catch(err =>{
    console.log(err)
  })

};
</script>

<style scoped lang="scss">
$input_bg: #edf2f7;

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

.main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 120px;
  margin-left: 50px;
}
.single__img {
  width: 450px;
  img {
    width: 90%;
  }

}

.second__div{
  width: 600px;
}
%btn{
  border: none;
  width: 270px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  padding: 7px 0;


}
.single__edit {
  margin-right: 30px;
  background: blue;
  @extend %btn
}

.single__delete {
  @extend %btn;
  background: red;

}

.single__group {
  color: blue;
  margin-right: 7px;
  display: inline-block;
}
.modal__form-change-img {
  display: block;
  margin: 0 auto;
  //   display: none;
}
:hover .modal__form-change-img {
  display: block;
  //   position: absolute;
  width: 80px;
  height: 80px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba(240, 241, 245, 0.7);
  border-radius: 50%;
  label {
    text-align: center;
    font-size: 14px;
    cursor: pointer;
  }
  input {
    opacity: 0;
    cursor: pointer;
  }
}
.main_modal {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  h3 {
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
    button{
        width: 100px;
        padding: 6px 0;
        color: white;
        border: none;
        border-radius: 5px;
        background: rgb(42, 241, 42);
        margin: 15px 15px 15px 0; 
    }
  }
}
.flex__div{
    display: flex;
    justify-content: flex-end;
}
</style>
