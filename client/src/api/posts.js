import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:8000'
})

//axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.get['Content-Type'] = 'application/json'