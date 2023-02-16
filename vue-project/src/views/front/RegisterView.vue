<template>
  <n-card hoverable>
    <div class="right-cover">
      <img src="../../../images/tumblr1280.png" />
    </div>
    <div class="left-form">
      <n-form ref="valid" :model="form" :rules="rules" size="small">
        <span class="title">
          <h3>
            Register
            <br />
            會員註冊
          </h3>
        </span>
        <!-- 帳號 -->
        <n-form-item-row label="帳號" path="account">
          <n-input v-model:value="form.account" placeholder="輸入帳號" @keydown.enter.prevent />
        </n-form-item-row>
        <!-- email -->
        <n-form-item path="email" label="Email">
          <!-- <n-auto-complete
            v-model:value="form.email"
            :input-props="{
              autocomplete: 'disabled'
            }"
            :options="options"
            placeholder="請輸入Email"
            blur-after-select /> -->
          <n-input v-model:value="form.email" type="email" placeholder="請輸入Email" @keydown.enter.prevent />
        </n-form-item>
        <!-- 密碼 -->
        <n-form-item path="password" label="密碼">
          <n-input v-model:value="form.password" type="password" placeholder="請輸入密碼" @keydown.enter.prevent />
        </n-form-item>
        <!-- 密碼驗證 -->
        <n-form-item path="passwordConfirm" label="密碼驗證">
          <n-input v-model:value="form.passwordConfirm" type="password" placeholder="請再次輸入密碼" @keydown.enter="ButtonClick" />
        </n-form-item>
        <!-- 註冊按鈕 -->
        <div>
          <n-button round size="large" color="#CA9E" @click="ButtonClick" :loading="false">註 冊</n-button>
          <br />
          <n-space />
          <n-button text size="large" color="#CA9E" @click="ButtonClickLogin" :loading="false">已有帳號，點我登入</n-button>
        </div>
      </n-form>
    </div>
  </n-card>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useMessage, useDialog } from 'naive-ui'
import validator from 'validator'
import { api } from '@/plugins/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const message = useMessage()
const dialog = useDialog()

const valid = ref(null)

const loading = ref(false)

const form = reactive({
  account: '1234',
  email: '@yahoo.com',
  password: '1234',
  passwordConfirm: '1234'
})

const rules = {
  account: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('欄位必填')
        } else if (value.length < 4) {
          return new Error('帳號必須大於 4 個字')
        } else if (value.length > 20) {
          return new Error('帳號必須小於 20 個字')
        }
      },
      trigger: 'input'
    }
  ],
  email: [
    {
      required: true,
      // options: computed(() => {
      //   return ['@gmail.com', '@gmail.com'].map(suffix => {
      //     const prefix = value.split('@')[0]
      //     return {
      //       label: prefix + suffix,
      //       value: prefix + suffix
      //     }
      //   })
      // }),
      validator(rule, value) {
        if (!value) {
          return new Error('欄位必填')
        } else if (!validator.isEmail(value)) {
          return new Error('信箱格式錯誤')
        }
      },
      trigger: 'input'
    }
  ],
  password: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('欄位必填')
        } else if (value.length < 4) {
          return new Error('密碼必須大於 4 個字')
        } else if (value.length > 20) {
          return new Error('密碼必須小於 20 個字')
        }
      },
      trigger: 'input'
    }
  ],
  passwordConfirm: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('欄位必填')
        } else if (value.length < 4) {
          return new Error('密碼必須大於 4 個字')
        } else if (value.length > 20) {
          return new Error('密碼必須小於 20 個字')
        } else if (value !== form.password) {
          return new Error('密碼不一致')
        }
      },
      trigger: 'input'
    }
  ]
}

function ButtonClick(e) {
  console.log(form.value)
  e.preventDefault()
  valid.value?.validate(errors => {
    if (!errors) {
      dialog.success({
        title: 'Register',
        content: '註冊成功'
      })
      register()
    } else {
      console.log(errors)
      dialog.error({
        title: 'Register',
        content: '註冊未填'
      })
    }
  })
}

const logout = async () => {
  loading.value = true
  const result = await user.login(form)
  if (result.length > 0) {
    await dialog.error({
      title: '登入失敗',
      content: result,
      positiveText: '再試一次'
    })
  } else {
    await dialog.success({
      title: '登入成功',
      content: '點擊回到首頁',
      positiveText: '回到首頁'
    })
    router.push('/')
  }
  loading.value = false
}

function ButtonClickLogin(e) {
  router.push({ path: 'login' })
}
</script>

<style lang="scss">
.n-card {
  width: 70vw;
  height: 75vh;
  margin: auto;
  margin-top: calc(12vh - 60px);
  display: flex;
  .n-card__content,
  .n-card__content:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    .title {
      display: flex;
      color: #ccaa99ee;
      h3 {
        margin-top: 0px;
        margin-bottom: 15px;
      }
    }
    .right-cover img {
      width: 35vw;
      height: 75vh;
      object-fit: cover;
      overflow: hidden;
    }
    .left-form {
      width: 100%;
      // padding: 20px;
      display: flex;
      align-content: center;
      justify-content: center;
      .n-form {
        width: 65%;
      }
      .n-button {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
