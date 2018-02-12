## axios
基于 浏览器 + node.js 的 AJAX，并且使用 Promise

## 安装
```
npm install axios
```
也可以使用 CDN
```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## 示例
#### 发送 get 请求
```
为具有给定 ID 的用户发送请求
axios.get('/user?id=123').then((response) => {
    console.log(response)
}).catch((error) => {
    console.log(error)
})
或者
axios.get('/use',{
    params: {
        ID: 123
    }
}).then((response) => {
    console.log(response)
}).catch((error) => {
    console.log(error)
})
```

#### 发送 post 请求
```
axios.post('/usr',{
    username: 'xxx',
    password: 'xxx'
}).then((response) => {
    console.log(response)
}).catch((error) => {
    console.log(error)
})
```

#### 执行多个并发请求
```
function get1(){
    return axios.get('/user/next')
}
function get2(){
    return axios.get('/user/next/next')
}
axios.all([get1(),get2()]).then(axios.spread((acct, perms) => {
    <!-- 请求已完成 -->
    console.log(acct)
    console.log(perms)
}))
```

## API
```
发送一个 post 请求
axios({
    method: 'post',
    url: '/user/123',
    data: {
        uasername: 'xxx',
        password: 'xxx'
    }
})
```

```
获取远程图像请求
axios.get({
    methos: 'get',
    url: 'http://bit.ly/2mTM3nY',
    responseType: 'stream'
}).then((response) => {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
})
```

axios 默认发送 get 请求
```
axios('/user/123') === axios.get('/user/123')
```

#### axios 请求方法
```
axios.request(config)
axios.get(url[, config])
axios.put(url[, config])
axios.post(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.patch(url[, config])
axios.options(url[, config])
```
当使用上述写法时，` url ` + ` method ` + ` data ` 不需要在配置中指定

## 并发
处理并发请求的辅助函数
```
axios.all([fn1,fn2])
axios.spread(callback)
```

## 创建一个实例
使用自定义的配置创建一个新实例` axios.create([config]) `
```
let instance = axios.create({
    baseurl: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
})
```

## 实例方法
```
axios.request(config)
axios.get(url[, config])
axios.put(url[, config])
axios.post(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.patch(url[, config])
axios.options(url[, config])
```

## 请求配置
请求的可用配置选项,URL 是必需的，如果没有指定 method，则默认为 ` get `
```
{
    url: '/user', // url 是将用于请求的服务器的 URL
    
    method: 'get', // get 是默认的请求方法
    
    baseurl: 'https://some-domain.com/api/', // bashurl 地址将被t添加到 url 中，除非 url 是绝对地址

    // transformRequest 允许修改数据在发送到服务器之前
    // 适用于 put + post + patch 方法
    // 数组中的最后一个函数必需返回一个 Buffer | ArrayBuffer 
    // FormData or Stream
    // 可以修改 headers object
    transformRequest: [function(date,header){
        // 操作数据
        return data
    }]，

    // transformResponse 可以在收到响应前改变响应数据
    // 它被传递到 then | catch
    transformResponse: [function(data){
        // 操作数据
        return data
    }]，
    headers: {'X-Requested-With': 'XMLHttpRequest'}，  // 发送的自定义的标题
    params: {  // url 参数，随请求发送，必需是一个 object | URLSearchParams object
        ID: '123'
    }，
    paramsSerializer: function(params) { // 是一个函数，负责序列化 params 
    // 例如 https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // data 是作为请求主体发送的数据
  // 适用于 put + post + patch
  // 当没有 transformRequest 设置时，必需是 
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data: {
      username: 'xxx'
  },

  timeout: 10000， // 指定超时前的毫秒数，如果请求时间大于 timeout 请求终止

  withCredentials: false， // 指示跨站点访问控制请求，应该使用证书，默认 false

  adapter: function(config){ // 允许对请求进行自定义处理，这使得测试更加容易，返回一个 Promise 和一个有效的响应

  },
  
  // 表示 HTTP 基本身份验证应该被使用并提供证书
  auth: {
      username: 'janedoe',
      password: 's00pers3cret'
  },
  
  // 指示服务器将响应的数据类型，包括'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'，json 是默认的
  responseType: 'json',

  // xsrfCookieName 作为一个 xsrf token 的值的 cookie 的名称
  xsrfCookieName: 'XSRF-TOKEN', // 默认
  
  // xsrfHeaderName 携带 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // onUploadProgress 允许上传的进度事件处理
  onUploadProgress: function(progressEvent){
      // 操作本地进度事件
  },

  // onDownloadProgress 允许下载的进度事件处理
  onDownloadProgress: function(progressEvent){
      // 操作本地进度事件
  },

  // maxContentLength 定义允许的 HTTP 响应内容的大小
  maxContentLength: 2000,

  // validateStatus 定义是否解析或拒绝给定 HTTP 响应状态码的 Promise
  // 如果 validateStatus 返回 true 或者设置为 null | undefined ,Promise 将被解析，否则 Promise 将被拒绝
  validateStatus: function(status){
      return status >= 200 && status < 300; // 默认
  },

  // maxRedirects 定义要遵循 Node.js 重定向的最大数量。如果设置为 0，则没有将被允许的重定向
  maxRedirects: 5, // 默认

  // httpAgent + httpsAgent 各自定义在执行 HTTP 时要使用的自定义代理和 HTTP 请求
  // 在 Node.js 中，允许添加选项 'keepAlive'，默认情况下不启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // proxy 定义主机和代理服务器端口
  // 'false' 禁用代理忽略环境变量
  // 'auth' 表明 HTTP 基本身份验证应该用来连接到代理，并提供证书
  // 这是一个 Proxy-Authorization header ，覆盖现有的 Proxy-Authorization custom header，将会使用 proxy 设置的
  proxy: {
      host: '127.0.0.1',
      port: 9000,
      auth: {
          username: 'mikeymike',
          password: 'rapunz3l'
          }
  },

  // cancelToken 指定可用于取消请求的取消标记，详情见下文的取消部分
  cancelToken: new CancelToken(function(cancel){

  })
}
```

## 响应模式
请求的响应包含一下信息
```
data: {},  // 服务器提供的响应

status: 200, // HTTP 状态码

statusText: ok, // HTTP 状态信息

headers: {},  // 响应头【小写】

config: {}, // axios 请求的配置

request: {} // 请求
```

使用 ` then ` 时，收到如下响应
```
axios.get('/user/12345').then(function(response) {
    console.log(response.data)
    console.log(response.status)
    console.log(response.statusText)
    console.log(response.headers)
    console.log(response.config)
})
```
当使用 ` catch ` 或者通过 rejection callback 作为第二参数时，响应将通过错误对象获得

## Interceptors
可以拦截请求或响应在 ` then ` | ` catch ` 他们之前
```
添加一个请求拦截
axios.interceptors.request.use((config) => {
    // 在 request 发送之前做一些事情
    return config
},(error) => {
    // Do something with request error
    return Promise.reject(error)
})

添加一个响应拦截
axios.interceptors.response.use((response) => {
    // 在 response 之前做一些事情
    return response
},(error) => {
    // Do something with response error
    return Promise.reject(error)
})

添加一个自定义的 axios 拦截器
var instance = axios.create()
instance.interceptors.request.use((config) => {
    // do somithings
    return config
})
```

#### 删除拦截器
```
var myInterceptor = axios.interceptors.request.use(() => {
    // do somethings
})
axios.interceptors.request.eject(myInterceptor)
```

