/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import router from './router'
import pinia from './pinia'
import { useUserStore } from '@/stores/user'

export async function registerPlugins(app) {
  app.use(pinia)
  await useUserStore().getUser()
  app.use(router)
}
