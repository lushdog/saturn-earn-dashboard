import { Drawer, Button } from 'antd'
import ReactECharts from 'echarts-for-react'
import dayjs from 'dayjs'

const ConfigDrawer = ({ onCloseDrawer, pricePerDay, metrics, open }) => {
  const xAxis = metrics.map((item) => dayjs(item.timeStamp).format('MM-DD'))
  const yAxis = metrics.map((item) => item.filAmount)
  const yAxis2 = metrics.map((item) => item.numRequests)

  // TODO get fil price from api
  const filPrice = 4.5
  const earningFil = pricePerDay ? pricePerDay / filPrice : ''
  const markLineData = [
    {
      yAxis: earningFil,
      name: 'Earning Line'
    }
  ]
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '10%',
      right: '10%',
      bottom: '95px',
      containLabel: false
    },
    xAxis: [
      {
        type: 'category',
        data: xAxis,
        axisLabel: {
          rotate: 45
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'FIL'
      },
      {
        type: 'value',
        splitLine: { show: false },
        name: 'Retrieval'
      }
    ],
    series: [
      {
        name: 'FIL',
        type: 'line',
        yAxisIndex: 0,
        smooth: true,
        markLine: {
          animation: false,
          silent: true,
          lineStyle: {
            color: 'red',
            width: 2,
            type: 'dashed'
          },
          label: {
            formatter: ({ data }) => data.name
          },
          data: markLineData
        },
        data: yAxis
      },
      {
        name: 'Retrieval',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: yAxis2
      }
    ]
  }
  return (
    <Drawer
      title={'Earnings Chart'}
      width={1000}
      onClose={onCloseDrawer}
      open={open}
      destroyOnClose={true}
      maskClosable={false}
      forceRender={true}
      extra={
        <Button type="primary" onClick={onCloseDrawer}>
          关闭
        </Button>
      }
    >
      <ReactECharts
        lazyUpdate={true}
        notMerge={true}
        style={{ width: '100%', height: '80vh' }}
        option={options}
      />
    </Drawer>
  )
}

export default ConfigDrawer
