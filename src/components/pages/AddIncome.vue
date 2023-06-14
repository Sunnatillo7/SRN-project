<template>
  <appModal v-model="dialog">
    <Form @submit="formSubmit">
      <h3>Add income</h3>
      <label for="name">Select income type</label>
      <select
        @change="(evt) => handleChange(evt)"
        id="group"
        v-model="form.selected_type"
      >
        <option value="" disabled selected>Select type</option>
        <option value="from_sales">From sales</option>
        <option value="from_outside">From outside</option>
      </select>
      <label v-if="form.title === 'from_sales'" for="group">Select sales</label>

      <Field
        v-if="form.title === 'from_sales'"
        rules="required"
        :modelValue="form.selected_sales"
        v-slot="{ errors }"
        name="selected_sales"
      >
        <select id="group" v-model="form.selected_sales">
          <option value="" disabled selected>Select sales</option>
          <option v-for="item in client" :key="item.id" :value="item?.client?.id">
            {{ item?.client?.title }}
          </option>
        </select>
        <p class="login__input-error" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <label for="login">Amount</label>
      <Field rules="required" :modelValue="form.amount" v-slot="{ errors }" name="Amount">
        <input id="login" placeholder="Amount" type="number" v-model="form.amount" />
        <p class="login__input-error" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>
      <div class="flex__div">
        <button type="submit">Add</button>
      </div>
    </Form>
  </appModal>
</template>

<script setup>
import appModal from "@/components/ui/app-modal";
import { Form, Field } from "vee-validate";
import { ref, defineExpose, onMounted } from "vue";
import Notification from "../../plugins/Notification";
import store from "@/store";
import http from "../../plugins/axios";
const client = ref([]);

const dialog = ref(false);
const form = ref({
  amount: "",
  selected_sales: null,
  selected_type: "",
  title: "",
});
onMounted(() => {
  store.dispatch("getClient");
});
const getSales = () => {
  http
    .get(`/api/warehouse/output-invoice/`)
    .then((res) => {
      client.value = res.data.results;
      console.log(res, "bu res");
    })
    .catch((err) => {
      console.log(err);
    });
};
getSales();
const openModal = () => {
  dialog.value = !dialog.value;
};
defineExpose({ openModal });
const handleChange = (evt) => {
  console.log(evt.target.value, "bu target");
  if (evt.target.value === "from_sales") {
    form.value.title = "from_sales";
  } else if (evt.target.value === "from_outside") {
    form.value.title = "from_outside";
  }
};

const formSubmit = () => {
  if (form.value.title === "from_sales") {
    http
      .post(`/api/finance/income/`, {
        income_type: form.value.selected_type,
        invoice: form.value.selected_sales,
        amount: form.value.amount,
      })
      .then((res) => {
        console.log(res, "income");
        if(res.status === 201){
          Notification({text:'Income is adedd!'},{type:'success'})
          setTimeout(()=>{
            location.reload()
          },1500)
        }else{
          Notification({text:'Income is not adedd!!!'},{type:'danger'})
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    http
      .post(`/api/finance/income/`, {
        income_type: form.value.selected_type,
        // invoice: form.value.selected_sales,
        amount: form.value.amount,
      })
      .then((res) => {
        console.log(res, "income");
        if(res.status === 201){
          Notification({text:'Income is adedd'}, {type:'success'})
          setTimeout(()=>{
           location.reload()
          },1500)
        }else{
          Notification({text:'You have a mistake !'},{type:'danger'})
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
  h3{
    text-align: center;
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
  button {
    width: 100%;
    padding: 6px 0;
    color: white;
    border: none;
    border-radius: 5px;
    background: $blue-color;
    margin: 15px 15px 15px 0;
  }
}
.flex__div {
  display: flex;
  justify-content: flex-end;
}
</style>
