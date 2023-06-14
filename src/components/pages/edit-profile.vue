<template>
  <div>
    <appModal v-model="dialog"  :width="'40%'">
      <div class="main_div">
        <Form @submit="sendEdit" class="Form">
          <h3>Edit profile</h3>
          <div class="modal__form-img">
            <img :src="$store?.state?.me?.image" alt="img" />
            <div class="modal__form-change-img">
              <label for="file">Change image</label>
              <input
                type="file"
                ref="file"
                id="file"
                @change="(evt) => handleChange(evt)"
              />
            </div>
          </div>

          <Field
            rules="required"
            :modelValue="form2.first_name"
            v-slot="{ errors }"
            name="Firstname"
          >
            <div class="Login__form-input">
              <input
                id="password"
                placeholder="Firstname"
                type="text"
                v-model="form2.first_name"
              />
            </div>
            <p class="login__input-error" v-if="errors && errors.length">
              {{ errors[0] }}
            </p>
          </Field>
          <Field
            rules="required"
            :modelValue="form2.last_name"
            v-slot="{ errors }"
            name="Lastname"
          >
            <div class="Login__form-input">
              <input
                id="password"
                placeholder="LAstname"
                type="text"
                v-model="form2.last_name"
              />
            </div>

            <p class="login__input-error" v-if="errors && errors.length">
              {{ errors[0] }}
            </p>
          </Field>
          <Field
            rules="required"
            :modelValue="form2.email"
            v-slot="{ errors }"
            name="Email"
          >
            <div class="Login__form-input">
              <input
                id="password"
                placeholder="Email"
                type="email"
                v-model="form2.email"
              />
            </div>
            <p class="login__input-error" v-if="errors && errors.length">
              {{ errors[0] }}
            </p>
          </Field>

          <Field
            rules="required"
            :modelValue="form2.phone_number"
            v-slot="{ errors }"
            name="Phone"
          >
            <div class="Login__form-input">
              <input
                id="password"
                placeholder="Phone"
                type="number"
                v-model="form2.phone_number"
              />
            </div>
            <p class="login__input-error" v-if="errors && errors.length">
              {{ errors[0] }}
            </p>
          </Field>

          <div class="edit_btn_div">
            <button type="submit">Edit</button>
          </div>
        </Form>
      </div>
    </appModal>
  </div>
</template>

<script setup>
import appModal from "@/components/ui/app-modal.vue";
import { ref, defineExpose } from "vue";
import Notification from "../../plugins/Notification";
import { Form, Field } from "vee-validate";
import http from "../../plugins/axios";
const file = ref(null);
const image = ref(null);
const form2 = ref({
  first_name: "",
  last_name: "",
  email: "",
  image: "",
  phone_number: "",
});
const sendEdit = () => {
  const form = new FormData();
  form.append("first_name", form2.value.first_name);
  form.append("last_name", form2.value.last_name);
  form.append("email", form2.value.email);
  form.append("phone_number", form2.value.phone_number);
  form.append("image", image.value);

  http
    .put("/api/user/me/", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) Notification({ text: "Good job" }, { type: "success" });
      setTimeout(() => {
        location.reload();
      }, 2100);
    })
    .catch((err) => {
      console.log(err);
    });
};

const dialog = ref(false);
const openModal = (item) => {
  dialog.value = !dialog.value;
  if (item && item.id) form2.value = { ...item };
};
const handleChange = (evt) => {
  image.value = evt.target.files[0];
};

defineExpose({ openModal });
</script>

<style scoped lang="scss">
$blue-color: #435ebe;
$input-bg: #edf2f7;
$hover-color: #f0f1f5;

.main_div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vh;

  h3 {
    text-align: center;
    margin: 10px 0;
    font-size: 25px;
  }

  .Form {
    width: 70%;
    margin: 20px 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    .edit_btn_div{
      display: flex;
      justify-content: flex-end;
    }

     
    button {
      width: 100px;
      margin-top: 40px;
      border: none;
      padding: 10px 0;
      color: #fff;
      font-size: 16px;
      background: $blue-color;
      border-radius: 5px;
      cursor: pointer;
    }
  

    .modal__form-img {
      width: 100%;
      display: flex;
      justify-content: center;
      cursor: pointer;
    }
    .modal__form-change-img {
      display: none;
    }
    &:hover .modal__form-change-img {
      display: block;
      position: absolute;
      width: 80px;
      height: 80px;
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
    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 50%;
      position: relative;
    }
  }
}

.Login__form-input {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // background: $input-bg;

  input {
    width: 100%;
    font-weight: 400;
    font-size: 14px;
    height: 45px;
    padding-left: 15px;
    color: #272a2c;
    background-color: $input_bg;
    border-radius: 5px;
    outline: none;
    margin-right: 5px;
    border: none;
    margin: 6px 0;
  }
  %input_act {
    cursor: pointer;
    background: transparent;
    margin-right: 10px;
  }
  .Login__show {
    @extend %input_act;
    display: none;
  }

}

.form__input {
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  height: 45px;
  padding-left: 15px;
  color: #272a2c;
  background: $input-bg;
  border-radius: 5px;
  outline: none;
  margin-right: 5px;
  border: none;
}
</style>
