// setTimeout(() => {
//   console.log('timer1');
//   setTimeout(() => {
//     console.log('timer3')
//   }, 0)
// }, 0)
// setTimeout(() => {
//   console.log('timer2')
// }, 0)
// console.log('start')

// start timer1 timer2 timer3

//

setTimeout(() => {
  Promise.resolve().then(() => {
    console.log('promise')
  })
  console.log('timer1')
}, 0)
setTimeout(() => {
  console.log('timer2')
}, 0)
console.log('start')

//start  timer1 promise timer2
//----
Promise.resolve().then(() => {
  console.log('promise1')
  const timer2 = setTimeout(() => {
    console.log('timer2')
  }, 0)
})
const timer1 = setTimeout(() => {
  console.log('timer1')
  Promise.resolve().then(() => {
    console.log('promise2')
  })
}, 0)
console.log('start')
// h start timer1() timer1 promise2
// w promise1

//start  promise1 timer1 promise2 timer2
//----
// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success')
//   }, 1000)
// })
// const promise2 = promise1.then(() => {
//   throw new Error('error!!!')
// })
// console.log('promise1', promise1)
// console.log('promise2', promise2)
// setTimeout(() => {
//   console.log('promise1', promise1)
//   console.log('promise2', promise2)
// }, 2000)
//
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
    console.log("timer1");
  }, 1000);
  console.log("promise1里的内容");
});
const promise2 = promise1.then(() => {
  throw new Error("error!!!");
});
console.log("promise1", promise1);
console.log("promise2", promise2);
setTimeout(() => {
  console.log("timer2");
  console.log("promise1", promise1);
  console.log("promise2", promise2);
}, 2000);
//--
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  setTimeout(() => {
    console.log('timer')
  }, 0)
  console.log("async2");
}
async1();
console.log("start")

// async1 start \async2 \start 
// async1 end \timer

//--
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
  setTimeout(() => {
    console.log('timer1')
  }, 0)
}
async function async2() {
  setTimeout(() => {
    console.log('timer2')
  }, 0)
  console.log("async2");
}
async1();
setTimeout(() => {
  console.log('timer3')
}, 0)
console.log("start")
//h  async1 start 
//async1 start \ async2 \start \async1 end \timer2 \timer3 \timer1
//--
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')
//srcipt start\async1 start\promise1\srcipt end
//--
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
    resolve('promise1 resolve')
  }).then(res => console.log(res))
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')
//srcipt start
//async1 start
//promise1
//srcipt end
//promise1 resolve
//async1 success
//async1 end


