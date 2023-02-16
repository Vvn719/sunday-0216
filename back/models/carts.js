import { Schema, model, ObjectId } from 'mongoose'

const cartSchema = new Schema({
  p_id: {
    type: ObjectId,
    ref: 'products',
    required: [true, '缺少商品']
  },
  quantity: {
    type: Number,
    required: [true, '缺少數量']
  }
})

const schema = new Schema({
  u_id: {
  // 紀錄是誰的購物車
    type: ObjectId,
    ref: 'users',
    required: [true, '缺少使用者']
  },
  // 紀錄買了什麼東西
  products: {
    type: [cartSchema],
    default: []
  }
}, { versionKey: false })

export default model('carts', schema)
