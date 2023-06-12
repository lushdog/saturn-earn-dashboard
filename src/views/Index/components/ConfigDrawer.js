import { Drawer, Space, Button, Form, Input, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { useLocalStorage } from 'react-use'

const ConfigDrawer = ({ onCloseDrawer, open }) => {
  const [form] = Form.useForm()
  const [serverList, setServerList] = useLocalStorage('serverList', [])

  const onFinish = ({ serverList }) => {
    setServerList(serverList)
    message.success('Save Success')
    onCloseDrawer()
  }

  useEffect(() => {
    form.setFieldsValue({
      serverList
    })
  })

  return (
    <Drawer
      title={'Configuration'}
      width={800}
      onClose={onCloseDrawer}
      open={open}
      destroyOnClose={true}
      forceRender={true}
    >
      <Form name="dynamic_form_nest_item" form={form} onFinish={onFinish} autoComplete="off">
        <Form.List name="serverList">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    marginBottom: 8
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'address']}
                    rules={[
                      {
                        required: true,
                        message: 'input FILECOIN address'
                      }
                    ]}
                  >
                    <Input style={{ width: 400 }} placeholder="FILECOIN address" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'serverName']}
                    rules={[
                      {
                        required: true,
                        message: 'Nikcname'
                      }
                    ]}
                  >
                    <Input placeholder="Nikename" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'price']}
                    rules={[
                      {
                        required: false,
                        message: 'price'
                      }
                    ]}
                  >
                    <Input placeholder="monthly cost($)" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default ConfigDrawer
