import EmptyImage from 'src/assets/images/empty.svg'
import { Empty as AEmpty } from 'antd'
const Empty = ({ height, description = '', children }) => {
  return (
    <AEmpty
      image={EmptyImage}
      imageStyle={{
        height
      }}
      description={description}
    >
      {children}
    </AEmpty>
  )
}
export default Empty
