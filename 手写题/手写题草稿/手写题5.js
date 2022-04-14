function throttlePromises(funcs, max) {
  const results = []
  async function doWork(iterator) {
    for (let [index, item] of iterator) {
      const result = await item()
      results[index] = result
    }
  }
  const iterator = Array.from(funcs).entries()
  const workers = Array(max).fill(iterator).map(doWork) // maps over asynchronous fn doWork, which returns array of results for each promise
  return Promise.all(workers).then(() => results)
}

const currentAsync = (fn, maxCount = 3) => {
  const holding = []
  let executing = 0

  function drain() {
    if (executing >= maxCount) return
    const nextHolding = holding.shift()
    if (nextHolding) {
      // console.log('\ndrain', executing);
      execTask(nextHolding)
    }
  }

  async function execTask(holding) {
    let [rawParams, resolve, reject, statusRef] = holding
    if (statusRef.current !== 'PENDING') {
      drain()
      return
    }
    executing++
    // console.log('execTask', executing);
    try {
      const res = await fn(rawParams)
      resolve(res)
    } catch (e) {
      reject(e)
    } finally {
      executing--
      drain()
    }
  }

  return function (rawParams) {
    // PENDING FULFILL REJECTED
    let statusRef = {
      current: 'PENDING'
    }

    let resolve
    let reject
    const defer = new Promise((r, j) => {
      resolve = () => {
        statusRef.current = 'FULFILL'
        r()
      }
      reject = () => {
        statusRef.current = 'REJECTED'
        j()
      }
      holding.push([rawParams, r, j, statusRef])
    }).catch(() => {})
    drain()
    return {
      abort: () => reject()
    }
  }
}

