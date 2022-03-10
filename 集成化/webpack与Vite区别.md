
Vite基于esbuild，esbuild由go编写，比js编写打包器预构建依赖快10倍

webpack先打包再启动开发服务器，请求服务器直接给打包结果

Vite直接启动开发服务器，请求哪个模块再对该模块进行实时编译
自动向依赖Module发出请求，将开发环境下的模块文件作为浏览器要执行的文件，webpack是打包合并
vite启动时不需要打包、分析模块依赖、编译，模块越多优势越明显，hmr方面当改动一个模块仅需让浏览器重新请求该模块
webpack是需要把该模块相关的依赖模块全部编译一次
vite开发环境可以瞬间启动，页面出现需要等一会


### 连环问 Commonjs 和 Es Module 区别
Commonjs 的特性如下：
CommonJS 模块由 JS 运行时实现。
CommonJs 是单个值导出，本质上导出的就是 exports 属性。
CommonJS 是可以动态加载的，对每一个加载都存在缓存，可以有效的解决循环引用问题。
CommonJS 模块同步加载并执行模块文件。

es module 总结
ES6 Module 静态的，不能放在块级作用域内，代码发生在编译时。
ES6 Module 的值是动态绑定的，可以通过导出方法修改，可以直接访问修改结果。
ES6 Module 可以导出多个属性和方法，可以单个导入导出，混合导入导出。
ES6 模块提前加载并执行模块文件，
ES6 Module 导入模块在严格模式下。
ES6 Module 的特性可以很容易实现 Tree Shaking 和 Code Splitting。

### 连环问 Tree Shaking是什么
消除无用js代码

