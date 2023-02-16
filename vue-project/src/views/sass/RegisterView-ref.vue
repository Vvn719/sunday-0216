<template>
  <div id="register">
    <div class="register-style">
      <h1 style="text-align: center">註冊</h1>
      <n-form ref="valid" :model="form" :rules="rules">
        <n-form-item path="account" label="帳號">
          <n-input v-model:value="form.account" placeholder="請輸入帳號" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="password" label="密碼">
          <n-input v-model:value="form.password" type="password" placeholder="請輸入密碼" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="passwordConfirm" label="重複密碼">
          <n-input v-model:value="form.passwordConfirm" type="password" placeholder="請再次輸入密碼" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="email" label="信箱">
          <n-input v-model:value="form.email" placeholder="請輸入信箱" @keydown.enter.prevent />
        </n-form-item>
        <div style="text-align: center">
          <n-button round type="primary" @click="ButtonClick" :loading="loading">註冊</n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import validator from 'validator'
import { api } from '@/plugins/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const message = useMessage()
const valid = ref(null)

const loading = ref(false)
const form = ref({
  account: '',
  password: '',
  passwordConfirm: '',
  email: ''
})
const rules = {
  // account: [
  //   {
  //     required: true,
  //     validator(rule, value) {
  //       if (!value) {
  //         return new Error('欄位必填')
  //       } else if (value.length < 4) {
  //         return new Error('帳號必須大於 4 個字')
  //       } else if (value.length > 20) {
  //         return new Error('帳號必須小於 20 個字')
  //       } else if (!/^[A-Za-z0-9]+$/.test(value)) {
  //         return new Error('帳號只能包含英數字')
  //       }
  //     },
  //     trigger: ['input', 'blur']
  //   }
  // ],
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
  ],
  email: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error('欄位必填')
        } else if (!validator.isEmail(value)) {
          return new Error('格式錯誤')
        }
      },
      trigger: ['input', 'blur']
    }
  ]
}

const register = async () => {
  // 如果驗證失敗
  if (!form.value === null) return
  loading.value = true
  try {
    await api.post('/users', form.value)
    router.push('/')
  } catch (error) {
    console.log(error?.response?.data?.message)
    loading.value = false
  }
}

function ButtonClick(e) {
  console.log(form.value)
  e.preventDefault()
  valid.value?.validate(errors => {
    if (!errors) {
      message.success('註冊成功')
      register()
    } else {
      // console.log(errors)
      message.error('註冊失敗')
    }
  })
}
</script>

<style lang="scss">
#register {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  .register-style {
    width: 1000px;
    padding: 10rem 2rem;
  }
}
</style>
