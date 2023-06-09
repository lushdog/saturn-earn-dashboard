export const yearOption = [{ value: 2023, label: '2023年' }]

export const deliveryStatus = ['全部', '未按时封包', '按时封包', '在研中']

export const trStages = ['TR123', 'TR4', 'TR4A', 'TR5', 'TR6', 'EWP']

export const circleColor = {
  unstart: '#B4B6BF',
  active: '#4094FF',
  delay: '#F22424',
  complated: '#25BD6A',
  error: '#FF5959',
  0: '#B4B6BF',
  10: '#4094FF',
  20: '#F22424',
  21: '#F22424',
  30: '#25BD6A'
}

export const textMap = {
  0: '距',
  10: '距',
  20: '延期',
  21: '延期',
  30: ''
}

// export const deliveryStatusCode = {
//   UNSTART: 0,
//   STARTING: 10,
//   DEALYING: 20,
//   DEALY_COMPALETE: 21,
//   COMPLATED: 30
// }

export const textMapColor = {
  风险放行: '#FFBC42',
  FAIL: '#FF4747',
  PASS: '#25BD6A'
}

export const statusMap = {
  0: {
    text: '在研中',
    color: 'rgba(50, 109, 240, 0.1)',
    tColor: '#326DF0'
  },
  1: {
    text: '已封包',
    color: 'rgba(37, 189, 106, 0.1)',
    tColor: '#05C575'
  }
}
