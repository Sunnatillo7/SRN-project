<template>
  <appModal v-model="dialog">
    <h3 class="title">Edit product</h3>
    <Form @submit="submitForm">
      <label for="login">Quantity</label>
      <Field
        rules="required"
        :modelValue="form.quantity"
        v-slot="{ errors }"
        name="Quantity"
      >
        <input id="login" placeholder="Quantity" type="number" v-model="form.quantity" />
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
        <button type="submit">Edit</button>
      </div>
    </Form>
  </appModal>
</template>

<script setup>
import appModal from "@/components/ui/app-modal";
import { ref, defineExpose } from "vue";
import { Form, Field } from "vee-validate";
import http from "../../plugins/axios";
// import Notification from "../../plugins/Notification";
const dialog = ref(false);
const form = ref({
  price: "",
  quantity: "",
  selected_product: "",
});
let id = ref(null);
const openModal = (item) => {
  dialog.value = !dialog.value;
  form.value = { ...item };
  id.value = item.invoice;
  console.log(id.value);
};
defineExpose({ openModal });
const submitForm = () => {
//   const form1 = new FormData();
//   form1.append("quantity", form.value.quantity)
//   form1.append("price", form.value.price);

  http.put(`/api/warehouse/output-invoice-item/${id.value}/`, {
        quantity: form.value.quantity,
        price: form.value.price,
        headers: {
        "Content-Type": "multipart/form-data",
      },
  })
  .then(res =>{
      console.log(res)
  }).catch(err =>{
      console.log(err)
  })
};
</script>

<style scoped lang="scss">
$blue-color: #435ebe;
$input_bg: #edf2f7;

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
