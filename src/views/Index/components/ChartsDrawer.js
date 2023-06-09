import { Drawer, Button } from 'antd'
import ReactECharts from 'echarts-for-react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { getFilPrice } from '../service'

const ConfigDrawer = ({ onCloseDrawer, pricePerDay, metrics, open }) => {
  const xAxis = metrics.map((item) => dayjs(item.timeStamp).format('MM-DD'))
  const yAxis = metrics.map((item) => item.filAmount)
  const yAxis2 = metrics.map((item) => item.numRequests)
  const [filPrice, setFilPrice] = useState(4)

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
  
  useEffect(() => {
    getFilPrice().then((res) => {
      isFinite(res.filecoin.usd) && setFilPrice(res.filecoin.usd)
    })
  }, [])

  return (
    <Drawer
      title={'Earnings Chart'}
      width={1000}
      onClose={onCloseDrawer}
      open={open}
      destroyOnClose={true}
      forceRender={true}
      extra={
        <Button type="primary" onClick={onCloseDrawer}>
          Close
        </Button>
      }
    >
      <ReactECharts
        lazyUpdate={true}
        notMerge={true}
        style={{ width: '100%', height: '50vh' }}
        option={options}
      />
    </Drawer>
  )
}

export default ConfigDrawer
