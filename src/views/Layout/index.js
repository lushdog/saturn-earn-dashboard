import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/'
import style from './index.module.less'
import { Layout } from 'antd'
import { Suspense } from 'react'
import Loading from 'src/components/Loading'

const { Content } = Layout

const Main = () => {
  return (
    <Layout>
      <Navbar />
      <Content>
        <Layout className={style.layout__content}>
          <Content className={style.layout__main}>
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}

export default Main
