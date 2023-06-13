import http from '../../utils/http'

export const getEarnByAddress = (params) => http.get('/', { params })

export const getFilPrice = () =>
  http.get('https://api.coingecko.com/api/v3/simple/price', {
    params: {
      ids: 'filecoin',
      vs_currencies: 'usd'
    }
  })
