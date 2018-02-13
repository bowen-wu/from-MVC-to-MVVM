!function () {
    simulateDataResponse()

    // Model 类
    function Model({ data, type }) {
        this.data = data
        this.type = type
    }
    Model.prototype.fetch = function ({ type, id }) {
        this.type = type
        this.data.id = id
        return axios.get(`/${this.type}s/${this.data.id}`).then(() => {
            // 不走
        }, ({ data }) => {
            this.data = data
            return data
        })
    }
    Model.prototype.update = function (updateData) {
        return axios.put(`/${this.type}s/${this.data.id}`, updateData).then(() => {
            // 不走
        }, ({ data }) => {
            this.data = data
            return data
        })
    }

    // *************** 上面是 MVC 类  ************** //


    let model = new Model({
        data: {
            name: '',
            number: 0,
            id: '',
        },
        type: ''
    })

    let view = new Vue({
        el: '#app',
        data: {
            book: {
                name: '',
                number: 0,
                id: '',
            },
            type: 'book',
            n: 1,
        },
        template: `
        <div>
            <div id="name">
                书名： {{book.name}} 
                数量： <span id="number">{{book.number}}</span>
            </div>
            <input type="text" v-model="n">
            N 的值是 {{n}}
            <div id="action">
                <button v-on:click="addOne">add n</button>
                <button v-on:click="minusOne">minus n</button>
                <button v-on:click="reset">reset</button>
            </div>
        </div>`,
        created() {
            model.fetch({
                type: this.type,
                id: 1
            }).then((data) => {
                this.book = model.data
            })
        },
        methods: {
            addOne() {
                model.update({
                    number: this.book.number + (this.n - 0)
                }).then((data) => {
                    this.book = model.data
                })
            },
            minusOne() {
                model.update({
                    number: this.book.number - (this.n - 0)
                }).then((data) => {
                    this.book = model.data
                })
            },
            reset() {
                model.update({
                    number: 0
                }).then((data) => {
                    this.book = model.data
                })
            },
        },
    })


    // 模拟响应
    function simulateDataResponse() {
        let books = {
            1: {
                name: '《JavaScript 高级程序设计》',
                number: 1,
                id: 1
            }
        }
        axios.interceptors.response.use((response) => {
            // 不走
            return response
        }, ({ response }) => {
            response.status = 200
            response.statusText = 'OK'

            let { config: { method, url, data } } = response
            if (url === '/books/1') {
                if (method === 'get') {
                    response.data = books[1]
                } else if (method === 'put') {
                    data = JSON.parse(data)
                    Object.assign(books[1], data)
                    response.data = books[1]
                }
            }
            return Promise.reject(response)
        })
    }
}.call()