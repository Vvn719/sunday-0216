import { Router } from 'express'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createProduct, getAllProducts, getProduct, getSellProducts, editProduct } from '../controllers/products.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, admin, upload, createProduct)
// 查所有架上商品
router.get('/', getSellProducts)
// 取所有東西需要管理員，順序有差 先 all 再 id，all才不會被當成單個 id
router.get('/all', jwt, admin, getAllProducts)
// 取單個商品 直接 get id
router.get('/:id', getProduct)
router.patch('/:id', content('multipart/form-data'), jwt, admin, upload, editProduct)

export default router
