### ts与js区别
ts是js的超集
浏览器、node能直接执行js，不能执行ts
ts有编译阶段，js只有转译阶段
ts增加类型提高了代码难写度
ts写出的代码ide转出文档

### any、unknow区别，never
```ts
let a:any =123
let b:unknow = 123
let c:string = value // 报错
let d:string = value as string
```
unknow比any类型检查更严格，any不做检查
never表示此处不要写代码了

### type和interface区别
interface用extends来实现继承
type使用&来实现联合类型

interface能重复扩展、type一个类型只能声明一次

type适用于基本类型，interface适用于object

interface会创建新的类型名称，type仅是创建类型别名

```ts
interface BType{b:string}
interface AType extends BType{a:string}
const a:AType={
  a:'11',
  b:'22'
}
type BBType = {bb:string}
type AAType = {aa:string}&BBType

const aa:AAType = {aa:'11', bb:'22'}
```


