import { createGlobalState } from 'react-use'

export const useGlobalValue = createGlobalState(() => ({
  userInfo: {}
}))
