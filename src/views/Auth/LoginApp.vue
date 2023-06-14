<template>
  <div class="Login">
    <appModal v-model="dialog" :width="'40%'">
      <div class="Login__roles">
        <p>Select your role</p>
        <select v-model="role.selected_role">
          <option value="" disabled selected>Select your role</option>
          <option v-for="item in role.roles" :key="item.id" :value="item">
            {{ item }}
          </option>
        </select>
        <div class="Login__roles-action">
          <button @click="Login_With_Role">Save</button>
        </div>
      </div>
    </appModal>
    <div class="Login__item">
      <h1>System enterence</h1>
      <Form @submit="Login">
        <label for="login">Username</label>
        <Field
          rules="required"
          :modelValue="form.username"
          v-slot="{ errors }"
          name="Username"
        >
          <input id="login" placeholder="Usernem" type="text" v-model="form.username" />
          <p class="login__input-error" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <label for="password">Password</label>

        <Field
          rules="required"
          :modelValue="form.password"
          v-slot="{ errors }"
          name="Password"
        >
          <div class="Login__form-input">
            <input
              id="password"
              placeholder="Password"
              :type="showPassword ? 'password' : 'text'"
              v-model="form.password"
            />
            <img
              @click="ChangePassword"
              :src="eyeHide"
              alt=""
              :class="showPassword ? 'Login__hide' : 'Login__show'"
            />
            <img
              @click="ChangePassword"
              :class="showPassword ? 'Login__show' : 'Login__hide'"
              :src="eye"
              alt=""
            />
          </div>
          <p class="login__input-error" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <button type="submit">ENTER</button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import { ref } from "vue";
import eye from "../../assets/Images/eye.svg";
import eyeHide from "../../assets/Images/eye-hide.svg";
import http from "../../plugins/axios";
import Notification from "../../plugins/Notification";
import appModal from "../../components/ui/app-modal.vue";
import {useRouter} from "vue-router"

const form = ref({
  username: "",
  password: "",
});

const router = useRouter()

const showPassword = ref(false);
const dialog = ref(false);

const ChangePassword = () => {
  showPassword.value = !showPassword.value;
};

const role = ref({
  selected_role: "",
  roles: [],
});
const Login = () => {
  http
    .post(`/api/user/token/`, {
      username: form.value.username,
      password: form.value.password,
    })
    .then((res) => {
      res;
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 400) {
        if (err.response.data.keys) {
          Notification({ text: "Select your role" }, { type: "success" });
          dialog.value = true;
        } else {
          Notification({ text: "You have a mistake" }, { type: "danger" });
        }
      }

      if (err.response.data.roles) {
        role.value.roles = err.response.data.roles;
      } else {
        Notification({ text: "You have a mistake !!!" }, { type: "danger" });
      }
    });
};


const Login_With_Role = ()=>{
  http.post(`/api/user/token/`, {
    username: form.value.username,
    password : form.value.password,
    current_role : role.value.selected_role
  }).then(res =>{
    console.log(res)
    if(res.data.access){
      sessionStorage.setItem("token", res.data.access)
      sessionStorage.setItem("role", res.data.current_role)

      if( res.data.current_role === "director"){
        router.push({name : "dashboard"})
      }else if(res.data.current_role === "salesman"){
        router.push({name : "clients"})
      }else if(res.data.current_role === "financier"){
        router.push({name:"income"})
      }
      else if(res.data.current_role === "warehouseman"){
        router.push({name :"product"})
      }
    }
  }).catch(err =>{
    console.log(err)
  })
}
</script>

<style lang="scss" scoped>
$blue-color: #435ebe;
$input_bg: #edf2f7;

.Login {
  width: 100%;
  background: #f3f7f9;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.Login__roles {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;

  p {
    font-size: 30px;
    margin-bottom: 20px;
    word-spacing: 0.5px;
  }
  select {
    width: 100%;
    height: 35px;
    font-size: 16px;
    border-radius: 5px;
  }
  .Login__roles-action {
    width: 100%;
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    button {
      border: none;
      color: #fff;
      background: $blue-color;
      padding: 12px 20px;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
    }
  }
}

.Login__item {
  width: 60%;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;

  h1 {
    font-weight: 600;
    font-size: 30px;
    color: #272a2c;
    margin: 20px auto;
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
}

@media (max-width: 990px) {
  .Login__item {
    width: 80%;
    Form {
      width: 80%;
    }
  }
}
@media (max-width: 576px) {
  .Login__item {
    width: 90%;
    Form {
      width: 90%;
    }
  }
}
</style>
