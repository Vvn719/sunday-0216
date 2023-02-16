import axios from 'axios'
import { useUserStore } from '../stores/user'

// 建立一個 api 變數，如複製一個 axios 設定，
// 預設 baseURL是 api網址(VITE_API=http://localhost:4000)
// 之後運作不需要每次都打 VITE_API=http://localhost:4000

//  import.meta.env 呼叫環境變數
export const api = axios.create({
  baseURL: import.meta.env.VITE_API
})

//  import.meta.env 呼叫環境變數
export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API
})

// axios 呼叫的地方 會先到 interceptors.request 才會再送出請求到 interceptors.request
// 攔截器 在送出請求 及 回應的中間攔截 修改回應的內容
apiAuth.interceptors.request.use(config => {
  const user = useUserStore()
  // config 就是呼叫後的設定，此處是將請求加上 使用者的 token
  config.headers.authorization = 'Bearer ' + user.token
  // 修改後的設定 return 出去 繼續執行送出請求到 node.js 的 api
  // 回應時會先進到 interceptors.request
  return config
})

// apiAuth.interceptors.response.use(成功時的 function, 失敗時的 function)
apiAuth.interceptors.response.use(
  res => {
    // 成功時的 function 直接回傳到 成功的地方
    return res
  },
  error => {
    // 先判斷 error 有沒有回應 如果失敗請求有回應
    if (error.response) {
      // 且失敗的請求回應是 401，可能是 JWT 驗證失敗 可能代表 => 使用者驗證過期
      if (error.response.status === 401) {
        // 再判斷 請求的網址 如果不是延長登入、登入、登出
        if (!['/users/extend', '/users/login', '/users/logout'].includes(error.config.url)) {
          // 就重新傳送延長登入請求
          const user = useUserStore()
          return apiAuth
            .patch('/users/extend')
            .then(({ data }) => {
              // 讓程式更新 pinia 的 user store 的 JWT
              user.token = data.result
              // 修改原請求的 JWT (舊的) = 修改成 新的 JWT
              error.config.headers.authorization = 'Bearer ' + user.token
              // 再重新傳送原請求
              return axios(error.config)
            })
            .catch(_ => {
              // 如果重新登入失敗，強制登出
              user.logout()
              // 回傳原本的錯誤到呼叫的地方
              return Promise.reject(error)
            })
        }
      }
    }
    // 如果失敗的請求沒回應，回傳原本的錯誤到呼叫的地方
    return Promise.reject(error)
  }
)
