import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
// import reportWebVitals from './reportWebVitals'
import 'src/styles/index'
import { BrowserRouter } from 'react-router-dom'
import days from 'dayjs'
import 'dayjs/locale/zh-cn'
// import zhCN from 'antd/es/locale/zh_CN'
import enUS from 'antd/es/locale/en_US'
import { ConfigProvider } from 'antd'

// days.locale('zh-cn')
days.locale('en-us')

const antdConfig = {
  locale: enUS,
  input: { autoComplete: 'off' }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <ConfigProvider {...antdConfig}>
      <App />
    </ConfigProvider>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log)
