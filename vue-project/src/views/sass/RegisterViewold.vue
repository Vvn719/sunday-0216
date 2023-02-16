<template>
  <n-card hoverable>
    <div class="right-cover">
      <img src="../../../images/1662364036_55-kartinkin-net-p-tsvetochnie-fei-i-elfi-oboi-krasivo-65.jpg" />
    </div>

    <div class="left-form">
      <!-- <n-form>
        <n-form-item label="帳號">
          <n-auto-complete
            v-model:value="value"
            :input-props="{
              autocomplete: 'disabled'
            }"
            :options="options"
            placeholder="輸入 Email"
            blur-after-select />
        </n-form-item>

        <n-form-item label="Password" :model="formValue" :rules="rules">
          <n-input v-model="formValue.user.password" placeholder="輸入密碼" maxlength="20"></n-input>
        </n-form-item>
      </n-form> -->
      <n-form :model="formValue" ref="formRef">
        <n-form-item label="帳號">
          <n-input v-model:value="formValue.email" @keydown.enter.prevent :rules="rules" />
        </n-form-item>
        <n-form-item>
          <n-button attr-type="button" @click="handleValidateClick">验证</n-button>
        </n-form-item>
      </n-form>
    </div>
  </n-card>
</template>

<!-- <script>
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup() {
    const formRef = ref(null)
    const valueRef = ref('')
    return {
      // formRef,
      formValue: ref({
        user: {
          mail: '',
          password: ''
        }
      }),
      rules: {
        user: {
          mail: '',
          password: ''
        }
      },
      value: valueRef,
      options: computed(() => {
        return ['@gmail.com', '@yahoo.com.tw', '@qq.com'].map(suffix => {
          const prefix = valueRef.value.split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
        })
      })
    }
  }
})
</script> -->

<script setup>
import { ref, reactive } from 'vue'
import validator from 'validator'
// import { useMessage } from 'naive-ui'

const formRef = ref(null)
// const message = useMessage()

const formValue = reactive({
  email: '',
  rules: {
    email: {
      required: true,
      // message: '請輸入信箱',
      trigger: ['input', 'blur']
    }
  }
})

const rules = {
  email(value) {
    return !!value || '需填'
  }
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
      padding: 20px;
      display: flex;
      justify-content: center;
      .n-form {
        width: 80%;
      }
    }
  }
}
</style>
