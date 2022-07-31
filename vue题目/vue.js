const obj = { foo: 123 }

function autorun(update) {
  const wrappedUpdate = () => {
    activeUpdate = wrappedUpdate
    update()
    activeUpdate = null
  }
  wrappedUpdate()
}

function convert(obj) {
  Object.keys(obj).forEach(key => {
    console.log('obj')
    let internalValue = obj[key] //初始值
    Object.defineProperty(obj, 'foo', {
      get() {
        console.log('getr---', internalValue)
        return internalValue
      },
      set(newValue) {
        console.log('object', newValue)
        internalValue = newValue
      }
    })
  })
}

convert(obj)
obj.count++

autorun(() => {
  console.log('yuanshi---', obj.foo)
})
/*store.getters实现*/
const MyStore = function (options) {
  const { state = {}, mutations = {}, getters = {} } = options
  const computed = {}
  const store = this
  store.getters = {}
  for (let [key, fn] of Object.entries(getters)) {
    computed[key] = function () {
      return fn(store.state, store.getters)
    }
    Object.defineProperties(store.getters, key, {
      get: function () {
        return store._vm[key] // 拿的computed中数据
      }
    })
  }
  this._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
}
