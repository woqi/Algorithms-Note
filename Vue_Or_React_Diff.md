- 概念：
Dom diff 对比两颗虚拟Dom树，组件变化，render新虚拟Dom，diff算法对比新旧虚拟Dom后得到patch，React用patch更新真实Dom
- 过程：
1.对比两棵树根节点，标签类型改变，将丢掉整颗树，删除对应真实Dom树创建新Dom树
2.根节点没变，查看属性是否改变
 2.1 属性没变，保留对应真实节点
 2.2 属性改变，只更新该节点属性，不创建新节点，更新style时，多个css属性只有一个改变，则更细化的更新改变部分
3.子节点对比过程同根节点
```
ul
li key=b b
li key=c c
--->变为
ul
li  a
li key=b b
li key=c c
```
react对比b-a,新建a删除b，对比c-b，同旁。加key，只添加a
- 面试官想听**双端交叉对比**
头头对比，两数组头部，若找到，将新节点patch到旧节点，头指针后移
尾尾对比，两数组尾部，若找到，将新节点patch到旧节点，尾指针前移
旧尾新头对比，若找到，新节点patch到旧节点，旧尾指针前移，新头指针后移
旧头新尾对比，若找到，新节点patch到旧节点，旧头指针后移，新尾指针前移
key对比

### react diff vs vue diff算法区别
数组储存相同父亲的一群子节点
1.react是从左向右遍历对比，vue是双端交叉对比
2.react需要维护至少3个变量，vue需要维护至少4个变量
3.vue整体效率比react更高
例：
假设有N个子节点，将最后的子节点移动到第一个
react需要借助Map进行key搜索找到匹配项，然后复用节点
vue会发现移动直接复用节点

- diff细节
**单个节点**，运行`reconcileSingleElement`，标签相同，复用旧节点，传入新节点props
**无key**，运行`reconcileChildrenArray`，对比新旧节点key，key被初始化为null || string
更新规则是：
新旧标签不相同，则用`createFiberFromElement`创建新节点（存疑）
新旧标签相同，属性相同直接复用，属性不同则更新属性，用`updateElement`（根据type、props更新）中`useFiber`（复用节点）修改
```js
reconcileChildrenArray(
  returnFiber,
  currentFirstChild, //旧节点的第一个孩子，从第一个节点调用第二个孩子，第二个孩子调用后续孩子，
  newChild, //新节点
  lanes
)
```
**有key**，
key顺序没变，走到updateElement，能复用的都复用
key顺序变了，key不相等`updateSlot return null`，预先认为应删除，不继续比较，后处理创建新节点时候看看能不能用旧节点
将之前的旧节点传入`mapRemainingChildren`，看看新节点key有没有跟就节点相同的，有就用`updateFromMap`捞出来。而且是从break的地方开始重新创建，最后走到`updateElement`

**react diff低效的原因** react有一点点状况就用map，vue在什么都没有的时候使用map，map占用额外的内存及cpu，有一定损耗
页面不经常重新排序，影响不大