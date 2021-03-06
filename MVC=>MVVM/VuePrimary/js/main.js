!function () {
    simulateDataResponse()

    // Model 类
    function Model({data,type}){
        this.data = data
        this.type = type
    }
    Model.prototype.fetch = function({type, id}) {
        this.type = type
        this.data.id = id
        return axios.get(`/${this.type}s/${this.data.id}`).then(() => {
            // 不走
        }, ({ data }) => {
            // *************** 从服务器获取到数据后保存到 model 中  ************** //
            this.data = data  
            return data
        })
    }
    Model.prototype.update = function(updateData) {
        return axios.put(`/${this.type}s/${this.data.id}`, updateData).then(() => {
            // 不走
        }, ({ data }) => {
            // *************** 从服务器获取到数据后保存到 model 中  ************** //
            this.data = data
            return data
        })
    }

    // // View 类
    // function View({el,temp}){
    //     this.el = el
    //     this.temp = temp
    // }
    // View.prototype.render = function(data) {
    //     let html = this.temp
    //     for(let key in data){
    //         html = html.replace(`{{${key}}}`,data[key])
    //     }
    //     $(this.el).html(html)
    // }

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
            type: 'book'
        },
        template: `
        <div>
            <div id="name">
                书名： {{book.name}} 
                数量： <span id="number">{{book.number}}</span>
            </div>
            <div id="action">
                <button v-on:click="addOne">add one</button>
                <button v-on:click="minusOne">minus one</button>
                <button v-on:click="reset">reset</button>
            </div>
        </div>`,
        created() {
            model.fetch({
                type: this.type,
                id: 1
            }).then((data) => {
                // *************** 选择从 model 中获取数据，而不是在 data 属性中  ************** //
                // *************** model.data 和 data 数据相同 ************** //
                this.book = model.data
            })
        },
        methods: {
            addOne() {
                let newNumber = this.book.number + 1
                model.update({
                    number: newNumber
                }).then((data) => {
                    // *************** 选择从 model 中获取数据，而不是在 data 属性中  ************** //
                    this.book = model.data
                    // this.view.render(data)
                })
            },
            minusOne() {
                let newNumber = this.book.number - 1
                model.update({
                    number: newNumber
                }).then((data) => {
                    // *************** 选择从 model 中获取数据，而不是在 data 属性中  ************** //
                    this.book = model.data
                    // this.view.render(data)
                })
            },
            reset() {
                model.update({
                    number: 0
                }).then((data) => {
                    // *************** 选择从 model 中获取数据，而不是在 data 属性中  ************** //
                    this.book = model.data
                    // this.view.render(data)
                })
            },
        },
    })

    // let controller = {
    //     init({ view, model }) {
    //         this.view = view
    //         this.model = model
    //         this.model.fetch({
    //             type: 'book',
    //             id: 1
    //         }).then((data) => {
    //             this.view.render(data)
    //         })
    //         this.bindEvents()
    //     },

        // addOne() {
        //     let newNumber = $('#number').text() - 0 + 1
        //     this.model.update({
        //         number: newNumber
        //     }).then((data) => {
        //         this.view.render(data)
        //     })
        // },
        // minusOne() {
        //     let newNumber = $('#number').text() - 1
        //     this.model.update({
        //         number: newNumber
        //     }).then((data) => {
        //         this.view.render(data)
        //     })
        // },
        // reset() {
        //     this.model.update({
        //         number: 0
        //     }).then((data) => {
        //         this.view.render(data)
        //     })
        // },
    //     bindEvents() {
    //         $(this.view.el).on('click', '#addOne', this.addOne.bind(this))
    //         $(this.view.el).on('click', '#minusOne', this.minusOne.bind(this))
    //         $(this.view.el).on('click', '#reset', this.reset.bind(this))
    //     }
    // }

    // controller.init({
    //     view: view,
    //     model: model
    // })



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