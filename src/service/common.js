import http from 'src/utils/http'

export const fetchUserInfo = () => http.get('/login_info')
