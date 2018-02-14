## 从 MVC 到 MVVM（Vue）

当 MVC 成型之后，我们将对 MVC 进行下列改造，便形成了 MVVM

1. 将 view 改为 Vue
2. 占位符采用胡子语法
3. Vue 需要 data，从而初始化 template，所以需要将 data 传给 Vue，不传给 model
4. data 作为 Vue 的属性存在，并且 data 中的所有属性都升级到当前 Vue 上
5. template 有且仅有一个根元素
6. Vue 不需要 render，它有自动的 render 机制
7. 如果需要更新 render，只需要更改 data 上相应的变量即可
8. Vue 采用局部更新技术，从而减少了渲染成本
9. Vue 中的 methods 属性代替的 controller 模块
10. 事件绑定采用在 template 上 使用 v-on 语法
11. Vue 提供了生命周期钩子，来写代码
12. Vue 既有单向绑定（渲染机制），又有双向绑定（v-model）

## 单向绑定 双向绑定
- 单向绑定：当改变内存中变量的值时，Vue 负责将新值局部更新到页面中（内存 ==> 页面）
- 双向绑定：当用户输入内容后，Vue 将用户输入保存到内存中，并更新内存中变量的值，再次的局部更新页面中变量的值（页面 ==> 内存 ==> 页面）

