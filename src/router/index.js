import { Navigate } from 'react-router-dom'
import Index from 'src/views/Index/index.js'
import Layout from 'src/views/Layout/'

export const RouteConfig = [
  {
    path: '/',
    element: <Navigate to="index" />
  },
  {
    path: 'index',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />
      },
    ]
  }
]

// export const sideBarMenu = [
//   {
//     key: '/board/indicator',
//     icon: <BarChartOutlined />,
//     label: '测试部指标体系'
//   }
// ]
