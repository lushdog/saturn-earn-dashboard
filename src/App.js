import './App.css'
import { useRoutes } from 'react-router-dom'
import { RouteConfig } from 'src/router/index'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import Layout from 'src/views/Layout/'
// import ReportDetail from 'src/views/ReportDetail/index.js'

function App() {
  // return (
  //   <Routes>
  //     <Route path="/" element={<Navigate to="/delivery/index" />}></Route>
  //     <Route path="delivery" element={<Layout />}>
  //       <Route path="index" element={<ReportDetail />}></Route>
  //     </Route>
  //   </Routes>
  // )
  // OR use hooks
  return useRoutes(RouteConfig)
}

export default App
