<template>
  <section class="main">
    <appModal v-model="dialog" :width="'40%'">
      <div class="Login__roles">
        <select v-model="role.selected_role">
          <option value="" disabled selected>Select your role</option>
          <option v-for="item in $store?.state?.me?.roles" :key="item.id" :value="item">
            {{ item }}
          </option>
        </select>
        <div class="Login__roles-action">
          <button @click="save_role_change">Save</button>
        </div>
      </div>
    </appModal>
    <appModal class="Login__item" v-model="visible" :width="'40%'">
      <Form @submit="Change_password" class="Form">
        <h2>Change password</h2>
        <label for="password">Old password</label>

        <Field
          rules="required"
          :modelValue="form.old_password"
          v-slot="{ errors }"
          name="Password"
        >
          <div class="Login__form-input">
            <input
              id="password"
              placeholder="Old password"
              :type="showPassword1 ? 'password' : 'text'"
              v-model="form.old_password"
            />
            <img
              @click="ChangePassword1"
              :src="eyeHide"
              alt=""
              :class="showPassword1 ? 'Login__hide' : 'Login__show'"
            />
            <img
              @click="ChangePassword1"
              :class="showPassword1 ? 'Login__show' : 'Login__hide'"
              :src="eye"
              alt=""
            />
          </div>
          <p class="login__input-error" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <label for="password">New password</label>

        <Field
          rules="required"
          :modelValue="form.new_password"
          v-slot="{ errors }"
          name="Password"
        >
          <div class="Login__form-input">
            <input
              id="password"
              placeholder="New password"
              :type="showPassword2 ? 'password' : 'text'"
              v-model="form.new_password"
            />
            <img
              @click="ChangePassword2"
              :src="eyeHide"
              alt=""
              :class="showPassword2 ? 'Login__hide' : 'Login__show'"
            />
            <img
              @click="ChangePassword2"
              :class="showPassword2 ? 'Login__show' : 'Login__hide'"
              :src="eye"
              alt=""
            />
          </div>
          <p class="login__input-error" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <label for="password">Repeate password</label>

        <Field
          rules="required"
          :modelValue="form.repeat_password"
          v-slot="{ errors }"
          name="Password"
        >
          <div class="Login__form-input">
            <input
              id="password"
              placeholder="Repeate password"
              :type="showPassword3 ? 'password' : 'text'"
              v-model="form.repeat_password"
            />
            <img
              @click="ChangePassword3"
              :src="eyeHide"
              alt=""
              :class="showPassword3 ? 'Login__hide' : 'Login__show'"
            />
            <img
              @click="ChangePassword3"
              :class="showPassword3 ? 'Login__show' : 'Login__hide'"
              :src="eye"
              alt=""
            />
          </div>
          <p class="login__input-error" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>
        <div class="btn_div">
          <button type="submit">Change</button>
        </div>
      </Form>
    </appModal>
    <editProfile class="edit_profile" ref="profile_Modal" />

  
    <div class="main__profile">
      <div>
        <img class="user_image" :src="$store?.state?.me?.image" alt="" />
        <h3>{{ $store?.state?.me?.first_name }} {{ $store?.state?.me?.last_name }}</h3>
        <button @click="openEdit_profile($store?.state?.me)"  class="edit_profile_btn">Edit profile</button>
      </div>
      <div>
        <p>
          Phone number
          <img class="arrow_img" :src="arrow" alt="icon" />
          <span>{{ $store?.state?.me?.phone_number }}</span>
        </p>
        <p>
          Email
          <img class="arrow_img" :src="arrow" alt="icon" />
          <span>{{ $store?.state?.me?.email }}</span>
        </p>
        <p>
          Username
          <img class="arrow_img" :src="arrow" alt="icon" />
          <span>{{ $store?.state?.me?.username }}</span>
        </p>
        <p>
          Roles
          <img class="arrow_img" :src="arrow" alt="icon" />
          <span v-for="item in $store?.state?.me?.roles" :key="item">{{ item }}</span>
        </p>
        <p>
          Current role
          <img class="arrow_img" :src="arrow" alt="icon" />
          <span>{{ $store?.state?.me?.current_role }}</span>
          <button @click="change_role" class="change_role_btn">Change</button>
        </p>
        <button @click="openChange_password" class="btn_change_password">
          Change password
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import arrow from "../../assets/Images/arrow.svg";
import store from "@/store";
import editProfile from "@/components/pages/edit-profile.vue"
import { Form, Field } from "vee-validate";
import appModal from "../../components/ui/app-modal.vue";
import Notification from "../../plugins/Notification";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import eye from "../../assets/Images/eye.svg";
import eyeHide from "../../assets/Images/eye-hide.svg";
import http from "../../plugins/axios";
const router = useRouter();
const visible = ref(false);
const profile_Modal = ref(null)

const dialog = ref(false);
const role = ref({
  roles: [],
  selected_role: "",
});

const openEdit_profile =(item) =>{
 profile_Modal.value.openModal(item)
}

const openChange_password = () => {
  visible.value = !visible.value;
};
const showPassword1 = ref(false);
const showPassword2 = ref(false);
const showPassword3 = ref(false);

const ChangePassword1 = () => {
  showPassword1.value = !showPassword1.value;
};
const ChangePassword2 = () => {
  showPassword2.value = !showPassword2.value;
};
const ChangePassword3 = () => {
  showPassword3.value = !showPassword3.value;
};

const Change_password = () => {
  http
    .post("/api/user/change-password/", {
      old_password: form.value.old_password,
      new_password: form.value.new_password,
      new_password_confirm: form.value.repeat_password,
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        Notification({ text: "Password is changed" }, { type: "success" });
      } else {
        Notification({ text: "You have a mistake !!!" }, { type: "danger" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  setTimeout(() => {
    window.location.reload();
  }, 2100);
};

const form = ref({
  old_password: "",
  new_password: "",
  repeat_password: "",
});

onMounted(() => {
  store.dispatch("getMe");

});




const change_role = () => {
  dialog.value = !dialog.value;
};



const save_role_change = () => {
  http
    .post("/api/user/change-role/", {
      role: role.value.selected_role,
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200 && role.value.selected_role === "financier") {
        router.push({ name: "profilefinance" });
      } else if (res.status === 200 && role.value.selected_role === "salesman") {
        router.push({ name: "profilesales" });
      } else if (res.status === 200 && role.value.selected_role === "director") {
        router.push({ name: "profiledirector" });
      } else if (res.status === 200 && role.value.selected_role === "warehouseman") {
        router.push({ name: "profile" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  sessionStorage.removeItem("role");
  sessionStorage.setItem("role", role.value.selected_role);
};
</script>

<style lang="scss" scoped>
$blue-color: blue;
$input_bg: #edf2f7;


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
%global_btn {
  border-radius: 7px;
  padding: 7px 0;
  border: none;
}
.arrow_img {
  width: 25px;
  transition: transform 0.5s ease-in-out;
}
.arrow_img:hover {
  transform: translateX(8px);
  color: blue;
}

.user_image {
  width: 250px;
  height: 250px;
  border-radius: 50%;
}
.main {
  display: flex;
  justify-content: center;
}

.main__profile {
  margin-top: 50px;
  box-shadow: 0, 0, 0, 0 rgb(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
  padding: 50px 30px;
  background: #fff;
  width: calc(100% - 50px);
  border-radius: 10px;

  h3 {
    margin: 15px 0;
  }
  span {
    margin-left: 20px;
  }
  .change_role_btn {
    width: 70px;
    @extend %global_btn;
    margin-left: 20px;
    color: white;
    background: blue;
  }
  p {
    font-size: 18px;
    font-weight: 500;
  }
}
.btn_change_password {
  width: 300px;
  background: yellow;
  cursor: pointer;
  @extend %global_btn;
}
.edit_profile_btn {
  width: 250px;
  @extend %global_btn;
  color: white;
  background: blue;
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
$input_bg: #edf2f7;

.Form {
  // width: 60%;
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  h2 {
    text-align: center;
  }
  button {
    background: blue;
    width: 90px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    color: white;
    padding: 7px 0;
  }
  .edit_btn_div {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    margin-right: 25px;
  }
  .btn_div {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    margin-right: 25px;
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
    margin-top: 10px;
    border: none;
  }
}
</style>
