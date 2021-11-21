const obj = {
  a: 12,
  b: [
    {
      name: 'lala',
      age: 20,
      have: [12, { a: 99 }],
    },
  ],
  c: new Date(2010, 0, 1, 0),
}

// let obj2 = DfsDeepClone(obj)
let obj2 = BfsDeepClone(obj)
obj2.a += 3
obj2.b[0].name = 'sad'
obj2.c.setFullYear(3000)
console.log(obj2, obj)


function DfsDeepClone(obj) {
  let map = new Map()
  function clone(obj) {
    if (map.has(obj)) return map.get(obj)
    //对象，基本类型
    if (typeof obj == 'object') {
      let res
      //数组
      if (Array.isArray(obj)) {
        res = obj.map(item => clone(item))
        //json
      } else if (obj.constructor === Object) {
        res = {}
        for (let key in obj) {
          res[key] = clone(obj[key])
        }
      } else {
        res = new obj.constructor(obj)
      }
      map.set(obj, res)
      return res
    } else {
      return obj
    }
  }
  return clone(obj)
}

//不推荐，因为很麻烦
function BfsDeepClone(obj) {
  //用队列的方式
  let map = new Map()
  let res = null
  let arr = [
    {
      value: obj,
      cb(newObj) {
        res = newObj
      },
    },
  ]
  while (arr.length > 0) {
    let { value, cb } = arr.shift()
    if (map.has(value)) cb(map.get(value))
    else {
      if (typeof value == 'object') {
        let res
        if (Array.isArray(value)) {
          res = []
          let complete = 0
          value.forEach((item, index) => {
            arr.push({
              value: item,
              cb(newItem) {
                res[index] = newItem
                complete++
                if (complete === value.length) {
                  cb(res)
                }
              },
            })
          })
        } else if (value.constructor === Object) {
          res = {}
          let complete = 0
          //记录obj长度
          let total = 0
          for (const key in value) {
            total++
            arr.push({
              value: value[key],
              cb(newValue) {
                res[key] = newValue
                complete++
                if (complete === total) {
                  cb(res)
                }
              },
            })
          }
        } else {
          cb(new value.constructor(value))
        }
      }else{
        //基本类型
        cb(value)
      } 
    }
  }
  return res
}

//
