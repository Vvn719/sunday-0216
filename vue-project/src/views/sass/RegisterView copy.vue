<template>
  <n-card hoverable>
    <div class="right-cover">
      <img src="../../../images/1662364036_55-kartinkin-net-p-tsvetochnie-fei-i-elfi-oboi-krasivo-65.jpg" />
    </div>
    <n-tabs default-value="login" size="small" justify-content="space-evenly" :ref="tabs">
      <n-tab-pane name="login" tab="Login">
        <div class="left-form">
          <n-form ref="valid" :model="form" :rules="rules" size="medium">
            <n-form-item-row label="帳號" path="account">
              <n-input v-model:value="form.account" placeholder="輸入帳號" @keydown.enter.prevent />
            </n-form-item-row>
            <n-form-item-row label="密碼" path="password">
              <n-input v-model:value="form.password" type="password" @keydown.enter.prevent />
            </n-form-item-row>
            <!-- 登入按鈕 -->
            <div>
              <n-button round size="large" color="#CA9E" @click="ButtonClickL" :loading="loading">登 入</n-button>
              <br />
              <n-space />
            </div>
          </n-form>
        </div>
      </n-tab-pane>
      <n-tab-pane name="register" tab="Register">
        <div class="left-form">
          <n-form ref="valid" :model="form" :rules="rules" size="medium">
            <!-- 帳號 -->
            <n-form-item-row label="帳號" path="account">
              <n-input v-model:value="form.account" placeholder="輸入帳號" @keydown.enter.prevent />
            </n-form-item-row>
            <!-- email -->
            <n-form-item path="email" label="Email">
              <n-auto-complete
                v-model:value="form.email"
                :input-props="{
                  autocomplete: 'disabled'
                }"
                :options="options"
                placeholder="請輸入 Email/帳號"
                blur-after-select />
            </n-form-item>
            <!-- 密碼 -->
            <n-form-item path="password" label="密碼">
              <n-input v-model:value="form.password" type="password" placeholder="請輸入密碼" @keydown.enter.prevent></n-input>
            </n-form-item>
            <!-- 密碼驗證 -->
            <n-form-item path="password" label="密碼驗證">
              <n-input v-model:value="form.passwordConfirm" type="password" placeholder="請再次輸入密碼" @keydown.enter.prevent></n-input>
            </n-form-item>
            <!-- 註冊按鈕 -->
            <div>
              <n-button round size="large" color="#CA9E" @click="ButtonClickR" :loading="loading">註 冊</n-button>
              <br />
              <n-space />
            </div>
          </n-form>
        </div>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useMessage } from 'naive-ui'
import validator from 'validator'
import { api } from '@/plugins/axios'
import { useRouter } from 'vue-router'

// import suffix from 'naive-ui/es/_internal/suffix'

const router = useRouter()

const message = useMessage()
const valid = ref(null)

const loading = ref(false)

const form = reactive({
  account: '',
  email: '',
  password: '',
  passwordConfirm: ''
})

const rules = {
  account: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('欄位必填')
        } else if (value.length < 4) {
          return new Error('須超過4個字')
        } else if (value.length > 10) {
          return new Error('須小於10個字')
        }
      },
      trigger: ['input', 'blur']
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
          return new Error('格式錯誤')
        }
      },
      trigger: ['input', 'blur']
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
      trigger: ['input', 'blur']
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
        } else if (value !== form.value.password) {
          return new Error('密碼不一致')
        }
      },
      trigger: ['input', 'blur']
    }
  ]
}

const login = async () => {
  if (!form.value === null) return
  loading.value = true
  try {
    await user.login(form)
  } catch (error) {
    console.log(error?.response?.data?.message)
    loading.value = false
  }
}

const register = async () => {
  // 如果 valid(form.value) 是 null 的時候 return
  if (!form.value === null) return
  loading.value = true
  try {
    await api.post('/users', form)
    router.push('/')
  } catch (error) {
    console.log(error?.response?.data?.message)
    loading.value = false
  }
}

function ButtonClickR(e) {
  console.log(form.value)
  e.preventDefault()
  valid.value?.validate(errors => {
    if (!errors) {
      message.success('註冊成功')
      register()
    } else {
      console.log(errors)
      message.error('註冊失敗')
    }
  })
}

function ButtonClickL(e) {
  console.log(form.value)
  e.preventDefault()
  valid.value?.validate(errors => {
    if (!errors) {
      message.success('登入成功')
      login()
    } else {
      console.log(errors)
      message.error('登入失敗')
    }
  })
}
</script>

<style lang="scss">
.n-card {
  width: 70vw;
  height: 60vh;
  margin: auto;
  margin-top: calc(20vh - 60px);
  .n-card__content,
  .n-card__content:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    .right-cover img {
      width: 28vw;
      height: 60vh;
      object-fit: cover;
      overflow: hidden;
    }
    .left-form {
      width: 100%;
      // padding: 20px;
      display: flex;
      justify-content: center;
      .n-form {
        width: 65%;
      }
    }
  }
}
</style>
