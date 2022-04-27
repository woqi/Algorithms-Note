const obj = { foo: 123 }


function autorun (update) {
  const wrappedUpdate = () => {
    activeUpdate = wrappedUpdate
    update()
    activeUpdate = null
  }
  wrappedUpdate()
}

function convert(obj){
  Object.keys(obj).forEach(key=>{
    console.log('obj')
    let internalValue = obj[key]//初始值
    Object.defineProperty(obj, 'foo', {
      get() {
        console.log('getr---',internalValue)
        return internalValue
      },
      set(newValue) {
       console.log('object',newValue)
       internalValue = newValue
      },
    })


  })

  
}


convert(obj)
obj.count ++

autorun(()=>{
  console.log('yuanshi---',obj.foo)
})

