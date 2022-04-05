//1.数组扁平化扁平化后基于id查找
const getNameByID = (address, id) => {
  let result = ''
  const next = arr => {
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      if (+item.id === +id) {
        result = item.name
        break
      }
      //children情况 递归
      if(Array.isArray(item.children)) next(item.children)
    }
  }
  next(address)
  return result
}
