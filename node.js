// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const fs = require('fs')
// const path = reuire('path')
// const filnames = fs
//   .readdirSync('./src/pages')
//   .filter(file => file.endsWith('js'))
//   .map(file => path.basename(file, '.js'))
// const entries = filnames.reduce((result, fileName) => ({ ...result, [fileName]: `./src/pages/${fileName}.js` }), {})
// const plugins = filnames.map(name => {
//   new HtmlWebpackPlugin({
//     filename: name + '.html',
//     chunks: [name]
//   })
// })
// module.exports = {
//   entry: { ...entries },
//   plugins: [...plugins]
// }
var a = {x:1} //地址 #111
var b = a // #111
a.x = a = {x:2} // #111.x = a = #222--->#111.x = #222 ,{x:2}地址时#222

console.log(a.x) // 在找#222.x的值 //2 
console.log(b.x) // b.x #111.x = #222 //{x:2}