import { useState } from "react"
import AuthService from "../../../service/auth.service"




const LoginForm = (props) => {
    const [inputValues, setInputValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')

    const authService = new AuthService()

    function handleSubmit(e) {
        e.preventDefault()

        authService
            .login(inputValues)
            .then(response => {
                props.storeUser(response.data)
            })
            .then(response => {
                props.history.push('/')
            })
            .catch(err => {
                setError(err.response.data.message)
            })

    }

    function handleChange(e) {
        e.preventDefault()
        e.preventDefault()
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    }

    return <form onSubmit={handleSubmit} >
        <div>
            <label >email</label>
            <input name='email' type="email" onChange={e => handleChange(e)} autoComplete='on' />
        </div>
        <div>
            <label >Password</label>
            <input type="password" name='password' onChange={e => handleChange(e)} autoComplete='on' />
        </div>
        <div>
            <button type="submit">Login</button>
        </div>
        {error}
    </form>


}

export default LoginForm