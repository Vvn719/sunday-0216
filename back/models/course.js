import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: [true, '須填名稱']
  },
  image: {
    type: [String],
    required: [true, '須填圖片']
  },
  description: {
    type: String,
    required: [true, '須填描述']
  },
  price: {
    type: Number,
    min: [0, '價格錯誤'],
    required: [true, '須填價格']
  },
  quantity: {
    type: Number,
    min: [0, '目前無庫存'],
    required: [true, '目前無庫存']
  },
  sell: {
    type: Boolean,
    required: [true, '販售狀態']
  }
}, { versionKey: false })

export default model('products', schema)
