<template>
  <div class="contain">
    <div class="topBtn">
      <n-button round @click="showModal(-1)" color="#CA9E">商品上架</n-button>
    </div>
    <div class="content">
      <n-table>
        <thead>
          <tr>
            <th>分類</th>
            <th>商品圖片</th>
            <th>名稱</th>
            <th>價錢</th>
            <th>商品</th>
            <th></th>
            <th>庫存</th>
            <th>內容</th>
            <!-- <th>刪除</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, idx) in products" :key="product._id">
            <td>{{ product.category[0] }}</td>
            <td :aspect-ratio="1" :width="150">
              <n-image :src="product.image[0]" :width="100" :height="100" object-fit="cover"></n-image>
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.sell === true ? '上架' : '下架' }}</td>
            <td><n-switch v-model:value="product.sell" /></td>
            <td>{{ product.quantity }}</td>
            <td>
              <n-button text @click="showModal(idx)">
                <n-icon size="24"><CreateIcon /></n-icon>
              </n-button>
            </td>
            <!-- <td>
              <n-button text>
                <n-icon size="22"><TrashIcon /></n-icon>
              </n-button>
            </td> -->
          </tr>
        </tbody>
      </n-table>
      <n-button text></n-button>
    </div>
  </div>

  <n-modal v-model:show="form.showModal" class="custom-card" preset="card" title=" " size="small" :bordered="false">
    <h2>{{ form._id.length > 0 ? '商品編輯' : '商品上架' }}</h2>
    <template #header-extra></template>
    <!-- v-model:value="form.valid" -->
    <n-form ref="valid" :model="form" label-placement="top" @submit.prevent="submit" :rules="rules">
      <n-form-item label="商品名稱" path="name">
        <n-input v-model:value="form.name" placeholder=" " maxlength="20" show-count clearable />
      </n-form-item>
      <n-form-item label="說明" path="description">
        <n-input
          v-model:value="form.description"
          placeholder=" "
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 10
          }" />
      </n-form-item>

      <n-form-item label="商品分類" path="category">
        <n-select v-model:value="form.category" placeholder=" " :options="categories" />
      </n-form-item>

      <n-form-item label="價格 (NT)" path="price">
        <n-input v-model:value="form.price" placeholder=" " type="number">
          <template #suffix>元</template>
        </n-input>
      </n-form-item>

      <n-form-item label="庫存" path="quantity">
        <n-input-number
          v-model:value="form.quantity"
          :style="{
            width: '100%'
          }"
          placeholder=" "
          button-placement="both"></n-input-number>
      </n-form-item>

      <n-form-item path="image">
        <n-upload v-model="form.image" list-type="image-card" @change="handleChange" accept=".jpg,.jpeg,.png,.gif,.tiff,.svg" multiple :default-file-list="originalImg">
          ＋
        </n-upload>
      </n-form-item>

      <n-form-item label="商品狀態" path="sell">
        <!-- <n-checkbox-group v-model:value="form.sell"> -->
        <n-space>
          <n-switch v-model:value="form.sell" />
          <!-- <n-checkbox :value="true">上架</n-checkbox>
            <n-checkbox :value="false">下架</n-checkbox> -->
        </n-space>
        <!-- </n-checkbox-group> -->
      </n-form-item>
    </n-form>

    <template #footer>
      <n-space>
        <n-button round :disabled="form.loading" attr-type="submit" @click="submit">送出</n-button>
        <n-button round :disabled="form.loading" @click="form.showModal = false">取消</n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<script setup>
import { reactive } from 'vue'
import { apiAuth } from '@/plugins/axios'
import { useRouter } from 'vue-router'
import validator from 'validator'
import { TrashOutline as TrashIcon, CreateOutline as CreateIcon, CaretUpCircleOutline as upIcon } from '@vicons/ionicons5'

const message = useMessage()

const valid = ref(null)

const originalImg = ref([])
const products = reactive([])
const category = ref([])
// 新增/編輯使用同一個 form 物件

const form = reactive({
  // 紀錄商品表單的 ID
  // ID 為空 => 新增
  // ID 為有 => 編輯
  _id: '',
  name: '',
  description: '',
  image: [],
  price: 0,
  quantity: 0,
  sell: false,
  category: [],
  // 判斷表單是否為送出狀態
  loading: true,
  showModal: false,
  idx: -1
})

const handleChange = options => {
  console.log(options.fileList)
  let i = []
  let j = []
  i = options.fileList.map(image => image.url).filter(url => url !== null)
  j = options.fileList.map(image => image.file).filter(url => url !== null)
  form.image = [...i, ...j]
}

const rules = {
  name: {
    validator: validateName,
    message: '請輸入商品名稱',
    trigger: ['blur', 'input']
  },
  description: {
    required: true,
    trigger: ['blur', 'input'],
    message: '請輸入商品說明'
  },
  price: {
    required: true,
    validator: validatePrice,
    trigger: ['blur', 'input'],
    message: '請輸入價錢'
  },
  quantity: {
    required: true,
    type: 'number',
    validator: validateQuantity,
    trigger: ['blur', 'input'],
    message: '請輸入目前庫存'
  },
  sell: {
    required: true,
    message: '請選擇商品狀態'
  },
  category: [
    {
      required: true,
      message: '請選擇分類'
    }
  ]
}

const categories = [
  {
    label: '耳針系列 Earrings',
    value: '耳針系列'
  },
  {
    label: '耳夾系列 ClipEarrings',
    value: '耳夾系列'
  },
  {
    label: '口罩鍊系列 Necklace',
    value: '口罩鍊系列'
  },
  {
    label: '客製禮物 CustomizedGift',
    value: '客製禮物'
  }
]

function validateName(rule, value) {
  return value.length > 0 && value.length <= 20
}

function validatePrice(rule, value) {
  return value > 0
}

function validateQuantity(rule, value) {
  return value >= 0
}

const showModal = idx => {
  if (idx === -1) {
    form._id = ''
    form.name = ''
    form.description = ''
    form.price = 0
    form.quantity = ''
    form.image = []
    form.sell = false
    form.category = ''
    // form.category = ''
    // form.valid = false
    form.loading = false
    form.idx = -1
    originalImg.value.length = 0
  } else {
    originalImg.value.length = 0
    form._id = products[idx]._id
    form.name = products[idx].name
    form.description = products[idx].description
    form.price = products[idx].price
    form.quantity = products[idx].quantity
    form.image = products[idx].image
    form.sell = products[idx].sell
    form.category = products[idx].category
    // form.category = products[idx].category
    // form.valid = false

    originalImg.value.push(
      ...form.image.map((image, idx) => {
        return {
          id: idx.toString(),
          name: idx.toString(),
          status: 'finished',
          url: image
        }
      })
    )

    form.loading = false
    form.idx = idx
  }
  form.showModal = true
}

const submit = async () => {
  form.loading = true
  valid.value?.validate(errors => {
    if (!errors) {
      form.loading = true
    } else {
      message.error('請填寫完整商品內容')
    }
  })

  // fd.append(key, value)
  const fd = new FormData()
  fd.append('name', form.name)
  fd.append('description', form.description)
  fd.append('price', form.price)
  fd.append('quantity', form.quantity)
  // fd.append('image', form.image)
  fd.append('sell', form.sell)
  fd.append('category', form.category)

  if (form.image.length >= 1) {
    form.image.forEach(item => {
      fd.append('image', item)
    })
  }

  try {
    if (form._id.length === 0) {
      const { data } = await apiAuth.post('/products', fd)
      products.push(data.result)
      message.success('新增成功')
    } else {
      const { data } = await apiAuth.patch('/products/' + form._id, fd)
      products[form.idx] = data.result
      message.success('編輯成功')
    }
    form.showModal = false
  } catch (error) {
    message.error(error?.response?.data?.message || '發生錯誤')
  }
  form.loading = false
}

;(async () => {
  try {
    const { data } = await apiAuth.get('/products/all')
    products.push(...data.result)
  } catch (error) {
    message.error(error?.response?.data?.message || '發生錯誤')
  }
})()
</script>

<style lang="scss">
.contain {
  margin: auto;
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

  .topBtn {
    margin: 20px 20px 20px 20px;
  }

  .n-table {
    width: 100%;
    text-align: center;
    justify-content: center;
    margin-bottom: 20px;
  }
}

.n-modal {
  width: 50vw;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  .n-card-header {
    padding: 2px;
  }
  .n-card__footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
