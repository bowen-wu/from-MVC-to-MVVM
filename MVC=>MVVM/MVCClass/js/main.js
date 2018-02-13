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
            return data
        })
    }
    Model.prototype.update = function(updateData) {
        return axios.put(`/${this.type}s/${this.data.id}`, updateData).then(() => {
            // 不走
        }, ({ data }) => {
            return data
        })
    }

    // View 类
    function View({el,temp}){
        this.el = el
        this.temp = temp
    }
    View.prototype.render = function(data) {
        let html = this.temp
        for(let key in data){
            html = html.replace(`{{${key}}}`,data[key])
        }
        $(this.el).html(html)
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

    let view = new View({
        el: '#app',
        temp: `
        <div id="name">
            书名： {{name}} 
            数量： <span id="number">{{number}}</span>
        </div>
        <div id="action">
            <button id="addOne">add one</button>
            <button id="minusOne">minus one</button>
            <button id="reset">reset</button>
        </div>`,
    })

    let controller = {
        init({ view, model }) {
            this.view = view
            this.model = model
            this.model.fetch({
                type: 'book',
                id: 1
            }).then((data) => {
                this.view.render(data)
            })
            this.bindEvents()
        },

        addOne() {
            let newNumber = $('#number').text() - 0 + 1
            this.model.update({
                number: newNumber
            }).then((data) => {
                this.view.render(data)
            })
        },
        minusOne() {
            let newNumber = $('#number').text() - 1
            this.model.update({
                number: newNumber
            }).then((data) => {
                this.view.render(data)
            })
        },
        reset() {
            this.model.update({
                number: 0
            }).then((data) => {
                this.view.render(data)
            })
        },
        bindEvents() {
            $(this.view.el).on('click', '#addOne', this.addOne.bind(this))
            $(this.view.el).on('click', '#minusOne', this.minusOne.bind(this))
            $(this.view.el).on('click', '#reset', this.reset.bind(this))
        }
    }

    controller.init({
        view: view,
        model: model
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