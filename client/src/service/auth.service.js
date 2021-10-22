import axios from 'axios'

class AuthService {

    constructor() {
        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}/auth`,
            withCredentials: true
        })
    }

    signup = userDetails => this.app.post('/signup', userDetails)
    sendWelcomeMail = mail => this.app.post('/welcomemail', mail)
    validate = token => this.app.post('/validate', token)
    login = userDetails => this.app.post('/login', userDetails)
    logout = () => this.app.get('/logout')
    isloggedin = () => this.app.post('/isloggedin')
    deleteUser = user_id => this.app.delete(`/delete/${user_id}`)
    updateUser = () => this.app.get('/client/details')

}

export default AuthService