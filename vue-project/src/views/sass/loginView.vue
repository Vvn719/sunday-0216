<template>
  <div class="login">
    <n-config-provider :theme-overrides="themeOverrides">
      <div class="card">
        <n-card>
          <n-tabs
            default-value="login"
            size="large"
            justify-content="space-evenly"
            :ref="tabs"
          >
            <n-tab-pane name="login" tab="登入">
              <n-form ref="valid" :model="form" :rules="rules">
                <n-form-item-row label="帳號" path="account">
                  <n-input v-model:value="form.account"
                    placeholder="輸入帳號"
                    @keydown.enter.prevent/>
                </n-form-item-row>
                <n-form-item-row label="密碼" path="password">
                  <n-input v-model:value="form.password"
                    type="password"
                    @keydown.enter.prevent/>
                </n-form-item-row>
              </n-form>
              <n-button type="primary" block secondary strong @click="login">
                登入
              </n-button>
            </n-tab-pane>

            <n-tab-pane name="register" tab="註冊">
              <n-form ref="valid" :model="form" :rules="rules">
                <!-- @submit.prevent="register" -->
                <n-form-item-row label="會員名稱" path="name">
                  <n-input
                    v-model:value="form.name"
                    placeholder="輸入會員名稱"
                  />
                </n-form-item-row>

                <n-form-item-row label="電子信箱" path="email">
                  <n-input
                    v-model:value="form.email"
                    placeholder="輸入電子信箱"
                    @keydown.enter.prevent
                  />
                </n-form-item-row>

                <n-form-item-row label="手機號碼" path="cellPhone">
                  <n-input
                    v-model:value="form.cellPhone"
                    placeholder="輸入手機號碼"
                    @keydown.enter.prevent
                  />
                </n-form-item-row>

                <n-form-item-row label="帳號(不可改)" path="account">
                  <n-input
                    v-model:value="form.account"
                    placeholder="輸入帳號"
                    @keydown.enter.prevent
                  />
                </n-form-item-row>

                <n-form-item-row label="密碼" path="password">
                  <n-input
                    v-model:value="form.password"
                    type="password"
                    @keydown.enter.prevent
                  />
                </n-form-item-row>
              </n-form>
              <n-button
                type="primary"
                block
                secondary
                strong
                @click="register"
                :loading="loading"
              >
                註冊
              </n-button>
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </div>
    </n-config-provider>
  </div>
</template>

<style lang="scss">
.login {
  height: calc(100vh - 60px);
  background: url("../../../assets/bg/login.png");
  background-size: 90%;
  

  .n-config-provider {
    width: 100%;
    overflow-x: hidden;
    height: 100%;
    position: relative;
    background-color: rgba(255, 255, 255, 0.4);
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #fff;
      border: 1px solid #ffe3da;
    }
  }
  .card {
    position: absolute;
    margin: auto;
    top: 70px;
    left: 0;
    bottom: 0;
    right: 0;

    width: calc(350px + 9vw);
  }
}
</style>

<script setup>
import { ref, reactive } from "vue";
import validator from 'validator';
import { useUserStore } from "@/stores/user";
import { api } from "@/plugins/axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
const router = useRouter();
const tabs = ref(null);
const valid = ref(null);

const loading = ref(false);
const user = useUserStore();
// const form = reactive({
//   name: null,
//   email: null,
//   cellPhone: null,
//   account: null,
//   password: null,
// });
const form = reactive({
  name: "aaaaa",
  email: "wwwdwa@awda.ee",
  cellPhone: "2222222222",
  account: "aaaaa",
  password: "aaaaa",
});

const rules = {
  name: [
    {
      required: true,
      message: "請輸入名稱",
    },
  ],
  email: [
    {
      required: true,
      message: "請輸入email",
    },
    {
      validator: validateEmail,
      message: "email格式錯誤",
      trigger: "input",
    },
  ],
  cellPhone: [
    {
      required: true,
      validator(rule, value) {
        return value.length == 10;
      },
      message: "請輸入10碼手機號碼",
      trigger: "input",
    },
  ],
  account: [
    {
      required: true,
      message: "請輸入帳號",
    },
    {
      validator: validateAccount,
      message: "長度必須為 4 ~ 20 個字",
      trigger: "input",
    },
  ],
  password: [
    {
      required: true,
      message: "請輸入密碼",
    },
  ],
};

function validateAccount(rule, value) {
  return value.length >= 4 && value.length <= 20;
}

function validateEmail(rule, value) {
  return validator.isEmail(value);
}

const userDetailform = {
  account: "",
  token: "",
};
const login = async () => {
  if (!valid.value) return;
  loading.value = true;
  try {
    await user.login(form);
    // const { data } = await api.post("/users/me", form); //會員資料頁面
    // token.value = data.result.token;
    // userImg.value = data.result.userImg;

    // name.value = data.result.name;
    // account.value = data.result.account;
    // cellPhone.value = data.result.cellPhone;
    // email.value = data.result.email;
    // birthday.value = data.result.birthday;

    // list.value = data.result.list;
    // dayList.value = data.result.dayList;
    // role.value = data.result.role;

    await Swal.fire({
      icon: "success",
      title: "成功",
      text: "登入成功",
    });
    
    router.push('/member/me')
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "失敗",
      text: error?.response?.data?.message || "發生登入錯誤",
    });
  }
  loading.value = false;
};
const register = async () => {
  if (!valid.value) return;
  loading.value = true;
  try {
    await api.post("/users", form);
    await Swal.fire({
      icon: "success",
      title: "成功",
      text: "註冊成功",
    });
    form.name = null;
    form.email = null;
    form.cellPhone = null;
    form.account = null;
    form.password = null;
    router.go(0);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "失敗",
      text: error?.response?.data?.message || "發生註冊錯誤",
    });
  }
  loading.value = false;
};
</script>
