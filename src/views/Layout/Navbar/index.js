import style from '../index.module.less'
import logo from 'src/assets/images/saturn-logo.svg'
import { Layout } from 'antd'

const { Header } = Layout

const Navbar = () => {
  return (
    <Header className={style.navbar}>
      <div className={style.site_wrapper}>
        <div
          className={style.logo_wrapper}
          style={{ background: `url(${logo})`, backgroundSize: 'cover' }}
        >
        </div>
        <div className={style.site_title}>STRN EARN</div>
      </div>
    </Header>
  )
}

export default Navbar
