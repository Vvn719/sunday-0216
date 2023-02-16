<template>
  <n-card>
    <template #cover>
      <n-image :src="image[0]" object-fit="cover"></n-image>
    </template>
    <span class="productName">{{ name }}</span>
    <br />
    <span>NT.{{ price }}</span>
    <br />
    <div class="NAIcon">
      <n-button text>
        <n-icon size="18"><LoveIcon /></n-icon>
      </n-button>
      <n-button text>
        <n-icon size="18"><CartIcon /></n-icon>
      </n-button>
    </div>
  </n-card>
</template>

<script setup>
import { NIcon } from 'naive-ui'
import { FlowerOutline as flowerIcon, HeartOutline as LoveIcon, CartOutline as CartIcon } from '@vicons/ionicons5'

defineProps({
  _id: { type: String, default: '' },
  name: { type: String, default: '' },
  price: { type: Number, default: 0 },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  Sell: { type: Boolean, default: false },
  category: { type: String, default: '' }
})
</script>
