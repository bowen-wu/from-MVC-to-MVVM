!function () {
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
        console.dir(response)
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

    // 上面是假的数据库 + 后台


    // 初始渲染
    axios.get('/books/1').then((response) => {
        // 不走
    }, ({ data }) => {
        let newHTML = $('#app').html().replace('{{bookName}}', data.name)
            .replace('{{number}}', data.number)
        $('#app').html(newHTML)
    })


    // 绑定事件
    $('#app').on('click', '#addOne', () => {
        let newNumber = $('#number').text() - 0 + 1
        axios.put('/books/1', {
            number: newNumber
        }).then(() => {
            // 不走 
        }, ({ config: { data } }) => {
            data = JSON.parse(data)
            $('#number').text(data.number)
        })
    })
    $('#app').on('click', '#minusOne', () => {
        let newNumber = $('#number').text() - 1
        axios.put('/books/1', {
            number: newNumber
        }).then(() => {
            // 不走 
        }, ({ config: { data } }) => {
            data = JSON.parse(data)
            $('#number').text(data.number)
        })
    })
    $('#app').on('click', '#reset', () => {
        axios.put('/books/1', {
            number: 0
        }).then(() => {
            // 不走 
        }, ({ config: { data } }) => {
            data = JSON.parse(data)
            $('#number').text(data.number)
        })
    })


}.call()