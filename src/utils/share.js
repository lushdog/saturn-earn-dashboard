import dayjs from 'dayjs'

export const isTrue = (value) => value !== '' && value !== null && value !== undefined

export const notNull = (value) => (Array.isArray(value) ? value.length > 0 : isTrue(value))

export const tranformList2Object = (list = [], key) => {
  return list.reduce((pre, next) => ({ ...pre, [next[key]]: next }), {})
}

export const getOptionByArray = (arr) => {
  return arr.map((item) => ({ value: item, label: item }))
}

export const formatDate2str = (value, fortmat = 'YYYY/MM/DD') => dayjs(value).format(fortmat)

export const formatDateStrList2date = (list) =>
  Array.isArray(list) ? list.map((item) => dayjs(item)) : []

export const formatDateList2str = (list, joinStr = ' ~ ') =>
  Array.isArray(list) ? list.map((item) => formatDate2str(item)).join(joinStr) : ''

export const getDateRange = (dateStr, split = '~') => {
  if (isTrue(dateStr)) {
    const dateList = dateStr.split(split)
    return [dayjs(dateList[0]), dayjs(dateList[1])]
  }
  return []
}

export const parseEmail = (str, isList = true) => {
  if (!str) return isList ? [] : ''
  const emailArr = str.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g) || []
  return isList ? emailArr : emailArr.join(',')
}

export const firstUpperCase = ([first = '', ...rest]) => first.toUpperCase() + rest.join('')

export function toArray(data) {
  if (!data) return []
  return Array.isArray(data) ? data : [data]
}

export const str2Array = (str) => {
  if (!str) return []
  return str.split(',')
}

export const array2Str = (arr) => {
  if (!arr || !arr.length) return ''
  return Array.isArray(arr) ? arr.join(',') : arr
}

export const NULL_FUNCTION = () => {}

export const getObjectKeyAndValue = (obj) => {
  const key = Object.keys(obj)[0]
  if (key) {
    return [key, obj[key]]
  }
  return []
}

export const formartArray = (value) =>
  isTrue(value) ? (Array.isArray(value) ? value : [value]) : []

export const findMax = (v1, v2) => {
  const n1 = Number(v1) || 0
  const n2 = Number(v2) || 0
  return Math.max(n1, n2)
}

export const hasKey = (obj, key) => Object.keys(obj).includes(key)

export const findItemInList = (list, key, matchStr) => {
  const item = list.find((item) => item[key] === matchStr)
  return item || undefined
}
