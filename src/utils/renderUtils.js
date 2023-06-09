import { Select } from 'antd'

export const renderOption = (options) => {
  return options.map((item) => (
    <Select.Option key={item.value} value={item.value}>
      {item.label}
    </Select.Option>
  ))
}
