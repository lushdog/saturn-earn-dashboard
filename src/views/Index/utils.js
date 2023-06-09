export const keepThreeDecimals = (num, dec = 3) => {
  if (typeof num !== 'number') {
    return num
  }
  return num.toFixed(dec)
}

export const kbToGb = (num) => {
  if (typeof num !== 'number') {
    return num + 'GB'
  }
  return keepThreeDecimals(num / 1024 / 1024 / 1024, 0) + 'GB'
}
