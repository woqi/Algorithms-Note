let obj = {
  a: {
    b: { aa: { m0: '2' } },
    c: { bb: { m1: '2' } },
    d: { cc: { m2: '2' } }
  }
}
/*遍历输出  ['m0', 'm1', 'm2', 'aa', 'bb', 'cc', 'b', 'c', 'd', 'a'] */
function levelOrder(obj) {
  let result = []
  let queue = []
  function loop(selfObj){
    for (let key in selfObj) {
      if (selfObj.hasOwnProperty(key)) {
        queue.push({
          key,
          value: selfObj[key]
        })
      }
    }
  }
  loop(obj)
  while (queue.length) {
    let length = queue.length
    let currentResult = []
    while (length--) {
      const current = queue.shift()
      const currentKey = current.key
      const currentValue = current.value
      currentResult.push(currentKey)
      if (typeof currentValue === 'object') {
        loop(currentValue)
      }
    }
    result.push(currentResult)
  }
  let formatResult = []  
  result.reverse().forEach(item => {
    formatResult = [...formatResult, ...item]
  })
  return formatResult
}
console.log('~~!!~~', levelOrder(obj))

