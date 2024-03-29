import { Router } from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import { register, login, logout, extend, getUser } from '../controllers/users.js'

const router = Router()

// 進到根目錄的 post 請求，會先經過 content 的 middleware
router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), auth.login, login)
router.delete('/logout', auth.jwt, logout)
router.patch('/extend', auth.jwt, extend)
router.get('/me', auth.jwt, getUser)
// router.post('/cart', content('application/json'), auth.jwt, editCart)
// router.get('/cart', auth.jwt, getCart)

export default router
