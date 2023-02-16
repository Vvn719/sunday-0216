import { Schema, model, ObjectId } from 'mongoose'

const orderSchema = new Schema({
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
    type: ObjectId,
    ref: 'users',
    required: [true, '缺少使用者']
  },
  products: {
    type: [orderSchema],
    default: []
  },
  date: {
    type: Date,
    // 如果 Date.now() 就是 sever 當下的時間
    default: Date.now
  }
}, { versionKey: false })

export default model('orders', schema)
