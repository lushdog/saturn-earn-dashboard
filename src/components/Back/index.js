import { Space } from 'antd'
import { BackArrowIcon } from 'src/icons/'
import { useNavigate } from 'react-router-dom'

const Back = ({ url }) => {
  const navigate = useNavigate()

  const onClick = () => {
    if (url) {
      navigate(url)
    } else {
      window.history.go(-1)
    }
  }

  return (
    <Space onClick={onClick} className="cursor-pointer">
      <BackArrowIcon />
      <span>返回</span>
    </Space>
  )
}

export default Back
