import { Schema, model, ObjectId } from 'mongoose'

const favoriteSchema = new Schema({
  p_id: {
    type: ObjectId,
    ref: 'products',
    required: [true, '目前收藏商品為 0']
  },
  quantity: {
    type: Number,
    required: [true, '收藏商品無庫存']
  }
})

const schema = new Schema({
  u_id: {
  // 紀錄是誰的收藏
    type: ObjectId,
    ref: 'users',
    required: [true, '缺少使用者']
  },
  // 紀錄收藏了什麼東西
  products: {
    type: [favoriteSchema],
    default: []
  }
}, { versionKey: false })

export default model('carts', schema)
