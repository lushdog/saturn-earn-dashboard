import http from 'src/utils/http'

export const fetchDeliverySummary = (params) => http.get('/projectDelivery/summary', { params })

export const fetchDeliveryDetail = (params) => http.get('/projectDelivery/detail', { params })

export const fetchProjectTrend = (params) => http.get('/projectDelivery/trend/project', { params })

export const fetchTrTrend = (params) => http.get('/projectDelivery/trend/trReview', { params })

export const fetchTrRate = (params) => http.get('/projectDelivery/trDeliveryRate', { params })

export const fetchDeliveryTrendPlanDetail = (params) =>
  http.get('/projectDelivery/trend/plan', { params })
