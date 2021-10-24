import axios from 'axios'

class UploadService {

    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/upload`,
            withCredentials: true
        })
    }

    uploadImage = data => this.app.post('/image', data)

}

export default UploadService