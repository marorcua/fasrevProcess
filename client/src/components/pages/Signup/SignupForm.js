import { useState } from "react"
import AuthService from "../../../service/auth.service"



export default function SignupForm() {
    const [inputValues, setInputValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')

    const authService = new AuthService()

    function handleSubmit(e) {
        e.preventDefault()

        authService
            .signup(inputValues)
            .then(response => {
                setError(response.data.message)
            })
            .then(() => {
                authService
                    .sendWelcomeMail({ email: inputValues.email })
                    .then(response => console.log(response))
                    .catch(err => {
                        console.log(err);
                        setError(err.response.data.message)
                    })
            })
            .catch(err => {
                console.log(err);
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
            <label >Email</label>
            <input name='email' type="email" onChange={e => handleChange(e)} autocomplete="on" />
        </div>
        <div>
            <label >Password</label>
            <input type="password" name='password' onChange={e => handleChange(e)} autocomplete="on" />
        </div>
        <div>
            <button type="submit">Signup</button>
        </div>
        {error}
    </form>


}