## 从 MVC 到 MVVM（Vue）

1. 添加 <script> 标签
<script src="https://cdn.bootcss.com/vue/2.5.13/vue.min.js"></script>

2. 将 view 改为 Vue，并注释 View 类

3. 给 Vue 添加 data 属性

4. template 属性只能有一个根元素

5. 吃掉 Controller，将 Controller 上除了 bindEvents 的方法复制到 Vue 的 methods 属性中

6. mothods 中的数据全部从 data 属性上获取

7. 更新 view 层只需要给 data 属性赋值即可

8. methods 属性中 model 成为变量直接使用

9. 绑定事件直接在 template 中的 HTML 上添加 v-on 即可,值为 methods 属性的属性名

10. 初始获取数据。利用生命周期钩子获取初始数据



