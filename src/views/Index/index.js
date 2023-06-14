import { useState, useRef } from 'react'
import { Card, Form, Button, DatePicker, Table, message, Modal, Input, Typography } from 'antd'
import dayjs from 'dayjs'
import ConfigDrawer from './components/ConfigDrawer'
import ChartsDrawer from './components/ChartsDrawer'
import { useLocalStorage } from 'react-use'
import { getEarnByAddress } from './service.js'
import isTodayPlugin from 'dayjs/plugin/isToday'
import { keepThreeDecimals, kbToGb } from './utils'
import { concurrentPromiseAllSettled } from 'concurrent-promise-all'

dayjs.extend(isTodayPlugin)

const { RangePicker } = DatePicker

const Index = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openCDrawer, setOpenCDrawer] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [metrics, setMetrics] = useState([])
  const [pricePerDay, setPrice] = useState(0)
  const [textValue, setValue] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [total, setTotal] = useState(0)

  const [, setServerList] = useLocalStorage('serverList', [])

  const dataMapRef = useRef({})

  const onFinish = (values) => {
    if (!values.dateRange) {
      return message.error('Please select a date range')
    }
    const startDate = dayjs(values.dateRange[0].format('YYYY-MM-DD HH:mm')).unix() + '000'
    const endDate = dayjs(values.dateRange[1].format('YYYY-MM-DD HH:mm')).unix() + '000'
    if (values.dateRange[0].isToday()) {
      fetchTotalEarn(dayjs().subtract(1, 'day').valueOf(), dayjs().valueOf())
    } else {
      fetchTotalEarn(startDate, endDate)
    }
  }

  const fetchEarnData = async (data) => {
    return await getEarnByAddress(data)
  }

  const fetchTotalEarn = async (startDate, endDate) => {
    setLoading(true)
    const serverList = JSON.parse(localStorage.getItem('serverList') || '[]')
    if (serverList.length >= 10) {
      message.loading('Expecting Long Time If You Have Many Nodes')
    }
    if (serverList.length === 0) {
      message.error('Please add at least one node')
      setLoading(false)
      return
    }
    const allPromise = serverList.map(async (item) => {
      const result = await fetchEarnData({
        filAddress: item.address,
        startDate,
        endDate,
        step: 'day'
      })
      return Object.assign({}, result, {
        filAddress: item.address,
        serverName: item.serverName,
        price: item.price
      })
    })
    const res = await concurrentPromiseAllSettled(allPromise, {
      maxConcurrent: 5
    })
      .catch((err) => {
        message.error(err.message)
      })
      .finally(() => {
        message.destroy()
        setLoading(false)
      })
    const data = res.map(({ value }) => {
      dataMapRef.current[value.filAddress] = value
      return {
        filAddress: value.filAddress,
        serverName: value.serverName,
        totalEarnings: keepThreeDecimals(value.globalStats.totalEarnings),
        totalBandwidth: kbToGb(value.globalStats.totalBandwidth),
        totalRetrievals: value.globalStats.totalRetrievals,
        perNodeMetrics: value.perNodeMetrics,
        // nodeCount: value.nodes[0].count,
        price: value.price
      }
    })
    const totalEarnings = res.reduce((acc, { value }) => acc + value.globalStats.totalEarnings, 0)
    setDataSource(data)
    setTotal(totalEarnings)
  }

  const rangePresets = [
    {
      label: 'Last 7 Days',
      value: [dayjs().add(-7, 'd'), dayjs()]
    },
    {
      label: 'Last 14 Days',
      value: [dayjs().add(-14, 'd'), dayjs()]
    },
    {
      label: 'Last 30 Days',
      value: [dayjs().add(-30, 'd'), dayjs()]
    },
    {
      label: 'Last 90 Days',
      value: [dayjs().add(-90, 'd'), dayjs()]
    }
  ]

  const columns = [
    {
      title: 'Node Name',
      dataIndex: 'serverName',
      key: 'serverName'
    },
    {
      title: 'Filecoin Address',
      dataIndex: 'filAddress',
      key: 'filAddress'
    },
    {
      title: 'Total Earnings',
      dataIndex: 'totalEarnings',
      key: 'totalEarnings',
      render: (text) => <span>{text} FIL</span>,
      sorter: (a, b) => a.totalEarnings - b.totalEarnings,
    },
    {
      title: 'Total Bandwidth',
      dataIndex: 'totalBandwidth',
      key: 'totalBandwidth',
      render: (text) => <span>{text} GB</span>,
      sorter: (a, b) => a.totalBandwidth - b.totalBandwidth,
    },
    {
      title: 'Total Retrievals',
      dataIndex: 'totalRetrievals',
      key: 'totalRetrievals',
      sorter: (a, b) => a.totalEarnings - b.totalEarnings,
    },
    {
      title: 'View Charts',
      dataIndex: 'viewCharts',
      render: (text, record) => (
        <Button type="link" onClick={() => handleViewChart(record)}>
          Open Charts
        </Button>
      )
    }
  ]

  const expandColumns = [
    {
      title: 'Status',
      dataIndex: 'max',
      key: 'max'
    },
    {
      title: 'Fil Amount',
      dataIndex: 'filAmount',
      key: 'filAmount'
    },
    {
      title: 'NodeId',
      dataIndex: 'idShort',
      key: 'idShort'
    },
    {
      title: 'Payout Status',
      dataIndex: 'payoutStatus',
      key: 'payoutStatus'
    },
    {
      title: 'Uptime Completion',
      dataIndex: 'uptimeCompletion',
      key: 'uptimeCompletion'
    }
  ]

  const handleConfig = () => {
    setOpenDrawer(true)
  }
  const handleImport = () => {
    setValue('')
    setModalOpen(true)
  }
  const handleExport = () => {
    const serverList = JSON.parse(localStorage.getItem('serverList') || '[]')
    const content = JSON.stringify(serverList)
    Modal.info({
      content,
      width: 800,
      title: 'Copy the content below and save it as a backup file'
    })
  }

  const onCloseDrawer = () => {
    setOpenDrawer(false)
  }
  const onCloseCDrawer = () => {
    setOpenCDrawer(false)
  }
  const handleViewChart = (record) => {
    console.log(record)
    const data = dataMapRef.current[record.filAddress]
    console.log(dataMapRef.current, data)
    const priceDay = data.price ? data.price / 30 : 0
    setMetrics(data?.metrics)
    setPrice(priceDay)
    setOpenCDrawer(true)
  }
  const ExpandedTable = ({ dataSource }) => (
    <Table
      pagination={false}
      size="small"
      rowKey={'idShort'}
      columns={expandColumns}
      dataSource={dataSource}
    ></Table>
  )
  const onOk = () => {
    try {
      const data = JSON.parse(textValue)
      setServerList(data)
      setModalOpen(false)
    } catch (error) {
      message.error('Invalid JSON')
    }
  }

  return (
    <div>
      <Card>
        <Form form={form} layout="inline" onFinish={onFinish}>
          <Form.Item name="dateRange" label="Date Range">
            <RangePicker presets={rangePresets} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleConfig}>
              Configuration
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={handleImport}>Import</Button>
          </Form.Item>
          <Form.Item>
            <Button type="default" onClick={handleExport}>
              Export
            </Button>
          </Form.Item>
          {total !== 0 && (
            <Form.Item>
              <Typography.Text>Total Earning: <span className="font-bold">{total}</span> FIL</Typography.Text>
            </Form.Item>
          )}
        </Form>
      </Card>
      <Table
        loading={loading}
        expandable={{
          expandedRowRender: (record) => <ExpandedTable dataSource={record.perNodeMetrics} />,
          rowExpandable: (record) => record.name !== 'Not Expandable'
        }}
        size="small"
        rowKey={'serverName'}
        className="mt-2"
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
      <ConfigDrawer onCloseDrawer={onCloseDrawer} open={openDrawer} />
      <ChartsDrawer
        onCloseDrawer={onCloseCDrawer}
        open={openCDrawer}
        metrics={metrics}
        pricePerDay={pricePerDay}
      />
      <Modal
        onOk={onOk}
        onCancel={() => setModalOpen(false)}
        open={modalOpen}
        title="Import from backup file"
        width={800}
      >
        <Input.TextArea
          value={textValue}
          onChange={(e) => setValue(e.target.value)}
          autoSize={{ minRows: 3 }}
          placeholder="Paste the backup content here"
        />
      </Modal>
    </div>
  )
}

export default Index
