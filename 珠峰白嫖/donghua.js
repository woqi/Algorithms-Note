(
  function(){
    const box = document.querySelector('#box')
    //t已经运动的时间 b起点位置 c 总距离（目标位置-起始位置）d 总时间当前应该运动到的位置
    const linear = function(t,b,c,d){
      return c*t / d+b

    }
    //开始运动 
    autoTimer = setInterval(()=>{
      time += 17
      if(time>=1000){
        clearInterval(autoTimer)
        box.style.transform = `translateX(300px)`
        return 
      }
      let cur = linear(time,0,300,1000)
      box.style.transform = `translateX(${cur}px)`
    })
  }
)()