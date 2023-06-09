import http from '../../utils/http'

export const getEarnByAddress = (params) => http.get('/', { params })
