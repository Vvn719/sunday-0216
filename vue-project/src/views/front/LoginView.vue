<template>
  <n-card hoverable>
    <div class="right-cover">
      <img src="../../../images/1662364036_55-kartinkin-net-p-tsvetochnie-fei-i-elfi-oboi-krasivo-65.jpg" />
    </div>
    <div class="left-form">
      <n-form ref="valid" :model="form" :rules="rules" size="medium" @submit.prevent="login">
        <span class="title">
          <h3>
            Register
            <br />
            會員登入
          </h3>
        </span>
        <n-form-item-row label="帳號" path="account">
          <n-input v-model:value="form.account" placeholder="輸入帳號" @keydown.enter.prevent />
        </n-form-item-row>
        <n-form-item-row label="密碼" path="password">
          <n-input v-model:value="form.password" type="password" @keydown.enter.prevent />
        </n-form-item-row>
        <!-- 登入按鈕 -->
        <div>
          <n-button round size="large" color="#CA9E" type="submit" :loading="false" @click="login">登 入</n-button>
          <br />
          <n-space />
          <n-button text size="large" color="#CA9E" :loading="false" @click="ButtonClickLogin">沒有帳號，點我註冊</n-button>
        </div>
      </n-form>
    </div>
  </n-card>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useMessage, useDialog } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'

// import suffix from 'naive-ui/es/_internal/suffix'

const router = useRouter()
const user = useUserStore()

const message = useMessage()
const dialog = useDialog()

const loading = ref(false)

const form = reactive({
  account: '5555@yahoo.com',
  password: '1234'
})

const login = async () => {
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
  router.push({ path: 'register' })
}
</script>

<style lang="scss">
.n-card {
  width: 70vw;
  height: 75vh;
  margin: auto;
  margin-top: calc(12vh - 60px);
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
      padding: 20px;
      display: flex;
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
