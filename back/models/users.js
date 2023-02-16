import { Schema, model, Error } from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'

const schema = new Schema(
  {
    account: {
      // type: String,
      // required: [true, '缺少帳號'],
      // minlength: [4, '帳號太短'],
      // maxlength: [15, '帳號太長'],
      // unique: true,
      // match: [/^[A-Za-z0-9]+$/, '帳號格式錯誤']
      type: String,
      required: [true, '缺少帳號'],
      unique: true,
      validate: {
        validator (value) {
          return validator.isEmail(value)
        },
        message: '帳號格式錯誤'
      }
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: [true, '缺少信箱'],
      unique: true,
      validate: {
        validator (value) {
          return validator.isEmail(value)
        },
        message: '信箱格式錯誤'
      }
    },
    tokens: {
      type: [String],
      default: []
    },
    role: {
      type: Number,
      // 0 = 使用者
      // 1 = 管理員
      default: 0
    }
  },
  { versionKey: false }
)

// 在存資料前如果改密碼，判斷資料格式是不是 ok 的
schema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    if (user.password.length >= 4 && user.password.length <= 15) {
      // 將密碼使用 bcrypt 加密 10 次
      user.password = bcrypt.hashSync(user.password, 10)
    } else {
      const error = new Error.ValidationError(null)
      error.addError('password', new Error.ValidatorError({ message: '密碼須大於4個字，並且小於15個字' }))
      next(error)
      return
    }
  }
  next()
})

// findOneAndUpdate 代表這是要更新的資料
schema.pre('findOneAndUpdate', function (next) {
  const user = this._update
  if (user.password) {
    if (user.password.length >= 4 && user.password.length <= 15) {
      user.password = bcrypt.hashSync(user.password, 10)
    } else {
      const error = new Error.ValidationError(null)
      error.addError('password', new Error.ValidatorError({ message: '密碼須大於4個字，並且小於15個字' }))
      next(error)
      return
    }
  }
  next()
})

export default model('users', schema)
