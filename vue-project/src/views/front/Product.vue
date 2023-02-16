<template>
  <div class="NAcontain">
    <div class="menu" collapse-mode="width">
      <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" :collapsed-width="902" />
    </div>
    <div class="NAcontent" v-for="product in products" :key="product._id">
      <ProductCard v-bind="product" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { api } from '@/plugins/axios'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()

const user = useUserStore()
const { editCart } = user

const valid = ref(false)
const quantity = ref(0)

const rules = {
  required(value) {
    return !!value || '欄位必填'
  },
  number(value) {
    return value > 0 || '數量錯誤'
  }
}

const product = reactive({
  _id: '',
  name: '',
  description: '',
  price: 0,
  quantity: 0,
  image: '',
  sell: true,
  category: ''
})

const submitCart = () => {
  if (!valid.value) return
  editCart({ _id: product._id, quantity: quantity.value })
}

;(async () => {
  try {
    const { data } = await api.get('/products/' + route.params.id)
    product._id = data.result._id
    product.name = data.result.name
    product.description = data.result.description
    product.image = data.result.image
    product.price = data.result.price
    product.quantity = data.result.quantity
    product.sell = data.result.sell

    product.category = data.result.category

    // 使用者看到的頁面標題改變
    document.title = 'NewArrival | ' + product.name
    // document.querySelector('meta[property="og:title"]').setAttribute('content', product.name)
  } catch (error) {
    message.error(error?.response?.data?.message || '無此商品')
    // 失敗的話丟回首頁
    router.go(-1)
  }
})()
</script>

<style lang="scss">
// 	sm	≥576px
// Medium	md	≥768px
// Large	lg	≥992px
// Extra large	xl	≥1200px
// Extra extra large	xxl	≥1400px

.NAcontain {
  width: 75vw;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  .menu {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .NAcontent {
    width: 25%;
    height: 380px;
    display: flex;
    .n-card {
      margin: auto;
      display: flex;
      height: 380px;
      width: 90%;
      padding: 0;
      background: none;
      text-align: left;
      .n-card__content {
        padding: 0;
      }
      .productName {
        font-weight: 600;
      }
      .n-image {
        width: 100%;
        height: 250px;
      }
      .NAIcon {
        display: flex;
        justify-content: end;
        .n-icon {
          padding: 5px;
        }
      }
    }
  }

  @media (max-width: 1200px) {
    .NAcontent {
      width: 50%;
      height: 380px;
      display: flex;
      .n-card {
        margin: auto;
        display: flex;
        height: 400px;
        width: 90%;
        padding: 0;
        background: none;
        text-align: left;
        .n-card__content {
          padding: 0;
        }
        .productName {
          font-weight: 600;
        }
        .n-image {
          width: 100%;
          height: 250px;
        }
        .NAIcon {
          display: flex;
          justify-content: end;
          .n-icon {
            padding: 5px;
          }
        }
      }
    }
    transition-duration: 0.5s;
  }

  @media (max-width: 768px) {
    .NAcontent {
      width: 100%;
      height: 460px;
      display: flex;
      .n-card {
        margin: auto;
        display: flex;
        height: 400px;
        width: 90%;
        padding: 0;
        background: none;
        text-align: left;
        .n-card__content {
          padding: 0;
        }
        .productName {
          font-weight: 600;
        }
        .n-image {
          width: 100%;
          height: 350px;
        }
        .NAIcon {
          display: flex;
          justify-content: end;
          .n-icon {
            padding: 5px;
          }
        }
      }
    }
  }
  transition-duration: 0.5s;
}
</style>
