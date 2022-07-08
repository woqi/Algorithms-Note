/**实现Pick */
interface Todo {
  title: string
  description: string
  completed: boolean
}
//答案
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
type TodoPreview = MyPick<Todo, 'title' | 'completed'>
const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
}

/*实现只读 */
interface Todo2 {
  title: string
  desription: string
}
const todo2: MyReadonly<Todo2> = {
  title: 'hey',
  desription: 'foobar'
}
// todo2.title = 'haha' //报错
//答案
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

/*实现可选 */
type MyAvailable<T> = {
  [K in keyof T]?: T[K]
}

/*实现 取数组第一项 */
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]
type head1 = First<arr1>
type head2 = First<arr2>
//答案
type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
type First2<T> = T extends [infer P, ...infer Rest] ? P : never

/*获得数组长度 */
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']
type teslaLength = Length<tesla>
//答案
type Length<T extends any[]> = T['length']

/*返回T中不存在U中的部分 */
type ExcludeT<T, U> = T extends U ? never : T
type C = Exclude<'a' | 'b', 'a' | 'c'> // 'b'

/*返回泛型 从Promise<ExampleType> 拿到 ExampleType*/
type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer P> ? (P extends Promise<unknown> ? Awaited<P> : P) : never

/* 实现类型 If<C, T, F>，当 C 为 true 时返回 T，否则返回 F*/
type MyIf<C,T,F> = C extends true ? T : F
type A = MyIf<true, 'a', 'b'>  // expected to be 'a'
type B = MyIf<false, 'a', 'b'> // expected to be 'b'

/*用类型系统实现 Concat<P, Q>，将两个数组类型连起来*/
type Concat<P,Q> = [
  ...P extends any[] ? P : [P],//兼容接受非数组类型
  ...Q extends any[] ? Q : [Q]
]

/*实现 Push */
type Result = Push<[1, 2], '3'> // [1, 2, '3']
type Push<T extends any[], K> = [...T, K]

/*实现Unshfit */
type Result2 = Unshift<[1, 2], 0> // [0, 1, 2,]
type Unshift<T extends any[], K> = [K, ...T]

/*拿到参数 */
type Paraments<T> = T extends (...args: infer P) => any ? P : []