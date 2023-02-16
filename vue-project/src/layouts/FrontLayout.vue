<template>
  <n-layout>
    <n-layout-header class="navbar">
      <div class="row">
        <a href="#">
          <div class="logo">
            <img src="../../images/SUNDAY-LOGO-02.png" />
          </div>
        </a>
        <div class="menu" collapse-mode="width">
          <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" :collapsed-width="902" />
        </div>
        <n-button text style="font-size: 24px" v-if="isLogin" @click="logout">
          <n-icon>
            <LogoutIcon />
          </n-icon>
        </n-button>
      </div>
    </n-layout-header>
    <n-layout class="content">
      <router-view></router-view>
    </n-layout>
    <!-- <n-layout-footer></n-layout-footer> -->
  </n-layout>
</template>

<script setup>
import { h, ref } from 'vue'
import { NIcon } from 'naive-ui'
import {
  FlowerOutline as flowerIcon,
  HeartOutline as LoveIcon,
  CartOutline as CartIcon,
  PersonOutline as PersonIcon,
  BagOutline as OrderIcon,
  LogInOutline as LoginIcon,
  LogOutOutline as LogoutIcon,
  StorefrontOutline as AdminIcon,
  BagAddOutline as bagIcon,
  List as ListIcon
} from '@vicons/ionicons5'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/user.js'

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const user = useUserStore()
const { isLogin } = storeToRefs(user)
const { logout } = user

const activeKey = ref(null)

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'newArrival'
          }
        },
        { default: () => 'NewArrival　｜' }
      ),
    key: 'NewArrival',
    icon: renderIcon(flowerIcon),
    children: [
      {
        type: 'group',
        label: '新品上市',
        key: 'people',
        children: [
          {
            label: '經典款式',
            key: 'classic',
            children: [
              {
                label: '耳針系列',
                key: 'earrings'
              },
              {
                label: '耳夾系列',
                key: 'clipEarrings'
              },
              {
                label: '口罩鍊系列',
                key: 'necklace'
              },
              {
                label: '客製禮物',
                key: 'customizedGift'
              }
            ]
          },
          {
            // type: 'group',
            label: '客製服務',
            key: 'customized',
            children: [
              {
                label: '訂製說明 Q&A'
              }
            ]
          }
        ]
      },
      {
        label: '實體市集',
        key: 'Market'
      },
      {
        label: '手工課程',
        key: 'class'
      }
    ]
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'favorite'
          }
        },
        { default: () => '' }
      ),
    key: 'Favorite',
    icon: renderIcon(LoveIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'cart'
          }
        },
        { default: () => '' }
      ),
    key: 'Cart',
    icon: renderIcon(CartIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'login'
          }
        },
        { default: () => '' }
      ),
    key: 'Login',
    icon: renderIcon(PersonIcon),
    children: [
      {
        label: '會員專屬',
        key: 'people',
        children: [
          {
            type: 'group',
            label: '會員登入 | 註冊',
            key: 'LoginRegister',
            icon: renderIcon(LoginIcon),
            show: !user.role === '0 || 1'
          },
          {
            label: '會員資料',
            key: 'memberList',
            icon: renderIcon(PersonIcon)
          },
          {
            label: '我的收藏',
            key: 'love',
            icon: renderIcon(LoveIcon)
          },
          {
            label: '訂單查詢',
            key: 'order',
            icon: renderIcon(OrderIcon)
          },
          {
            label: '立即結帳',
            key: 'cart',
            icon: renderIcon(CartIcon)
          }
        ]
      }
    ]
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'adminHome'
          }
        },
        { default: () => '' }
      ),
    key: 'admin',
    icon: renderIcon(AdminIcon),
    show: user.role == 1,
    children: [
      {
        type: 'group',
        label: '會員專屬',
        key: 'people',
        children: [
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: 'adminMember'
                  }
                },
                { default: () => '會員管理' }
              ),
            key: 'memberList',
            icon: renderIcon(PersonIcon)
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: 'adminProducts'
                  }
                },
                { default: () => '商品管理' }
              ),
            key: 'LoginRegister',
            icon: renderIcon(bagIcon)
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: 'adminOrders'
                  }
                },
                { default: () => '訂單管理' }
              ),
            key: 'orderList',
            icon: renderIcon(ListIcon)
          }
        ]
      }
    ]
  }
]
</script>

<style lang="scss">
body {
  margin: auto;
  text-align: center;
}

.n-layout {
  .navbar {
    width: 100vw;
    height: 60px;
    display: flex;
    justify-content: center;
    background-color: #f3d9ca;

    .row {
      width: 70vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo {
        width: 20%;
        display: flex;
        justify-content: flex-start;
        img {
          width: auto;
          height: 50px;
        }
      }
      .menu {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
      .n-menu.n-menu--horizontal .n-menu-item-content {
        padding: 0 5px;
      }
    }
  }

  .content {
    width: 100vw;
    height: calc(100vh - 60px);
    background-color: #f5efef;
  }

  // .n-layout-footer {
  //   width: 100vw;
  //   height: 60px;
  //   border: none;
  //   background-color: #f3d9ca;
  // }
}
</style>
