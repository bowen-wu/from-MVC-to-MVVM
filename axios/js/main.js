!function(){
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
    }, ({response}) => {
        console.dir(response)
        response.status = 200
        response.statusText = 'OK'

        let { config:{ method, url, data} } = response
        if(url === '/books/1'){
            if(method === 'get'){
                response.data = books[1]
            }
        }
        return Promise.reject(response)
    })


    axios.get('/books/1').then((response) => {
        // 不走
    },({data}) => {
        let newHTML = $('#app').html().replace('{{bookName}}',data.name)
        .replace('{{number}}',data.number)
        $('#app').html(newHTML)
    })



    $('#app').on('click','#addOne',() => {
        let newNumber = $('#number').text() - 0 + 1
        $('#number').text(newNumber)
    })
    $('#app').on('click','#minusOne',() => {
        let newNumber = $('#number').text() - 1
        $('#number').text(newNumber)
    })
    $('#app').on('click','#reset',() => {
        $('#number').text(0)
    })

}.call()