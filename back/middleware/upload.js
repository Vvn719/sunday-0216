import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const upload = multer({
  storage: new CloudinaryStorage({ cloudinary }),
  fileFilter (req, file, cb) {
    // 看上傳的檔案是否為 image 若不是則執行以下
    if (!file.mimetype.startsWith('image')) {
      cb(new multer.MulterError('LIMIT_FILE_FORMAT'), false)
    } else {
      cb(null, true)
    }
  },
  limits: {
    fileSize: 3000 * 3000
  }
})

export default (req, res, next) => {
  // 一個 image 欄位
  upload.fields([{ name: 'image', maxCount: 10 }])(req, res, error => {
    if (error instanceof multer.MulterError) {
      let message = '上傳錯誤'
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FILE_FORMAT') {
        message = '檔案格式錯誤'
      }
      res.status(400).json({ success: false, message })
    } else if (error) {
      res.status(500).json({ success: false, message: '未知錯誤' })
    } else {
      next()
    }
  })
}
