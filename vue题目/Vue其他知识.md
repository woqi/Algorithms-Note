### vue两种路由模式
**hash模式**
- 原理
使用window.location.hash属性及窗口的onhashchange事件，
可以实现监听浏览器地址hash值变化
解析`#`后的字符，称之为散列值、锚点，用于做页面跳转定位。
散列值不会被发送到服务器，不会引起页面重新加载
通过location.hash获取hash值，在浏览器地址栏会有反应
触发onhashchange场景：前进后退，浏览器url改变，只改变url哈希部分

**history模式**
- 原理
window.history指向history，表当前窗口浏览器会话历史，
history中pushState()和replaceState()实现前端路由，这两种方法应用于浏览器历史记录栈，通过两种方法改变url不会导致页面刷新
url改变触发popstate事件

- 差异
1.history和hash都是利用浏览器的两种特性实现前端路由，history是利用浏览历史记录栈的API实现，hash是监听location对象hash值变化事件来实现
2.history的url没有'#'号，hash反之
3.history修改的url可以是同域的任意url，hash是同文档的url
4.相同的url，history会触发添加到浏览器历史记录栈中，hash不会触发。
5.hash仅将url作为参数传递给后端，后端通过'#'截断，
6.history需要后端支持，后端未覆盖的路由地址则返回404，前端的 URL 必须和实际向后端发起请求的 URL 一致,
例如请求http://www.abc.com/book/id 缺乏/book/id后端返回404
hash仅‘#’符号之前的内容会被包含在请求中
``


