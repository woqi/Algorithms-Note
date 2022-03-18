//浏览器最多可以有6个并行网络请求 尽可能在更短时间内，运行完成得到结果，尽可能用最少的请求次数

//ajax并发管控
//模拟数据请求办法
const source = axios.CancelToken.source() //取消
const query = function query() {
  return axios.post('https://xxx.com/students', null, { cancelToken: source.token }).then(response => response.data)
}

const fetchStudents = function fetchStudents() {
  return new Promise(resolve => {
    let works = new Array(6).fill(null)
    values = [], //符合条件的放入

    works.forEach(() => {
      //每个工作区都基于递归一遍遍获取学生信息
      const next = () => {
        if (values.length >= 100) {
          source.calcel()
          resolve(value.slice(0, 100).sort((a, b) => b.score - a.score))
        }
        try {
          let value = await query()
          value = value.filter(item => item.score > 90 && new Date(item.time) - new Date('2021-12-03') > 0)
          values = values.concat(value)
        } catch (error) {
          next()
        }
      }
      next()
    })
    resolve()
  })
}
fetchStudents().then(value => {
  console.log('最终结果：', value)
})
