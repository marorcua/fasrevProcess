import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthService from "../../../service/auth.service";
import Login from "../Login/Login";
import Signup from "../Signup/SignupForm";


export default function Home() {
    const [selector, setSelector] = useState('Login')

    function handleClick(e) {
        e.preventDefault()
        const selectedName = e.target.innerHTML
        setSelector(selectedName)

    }
    let { token } = useParams()

    useEffect(() => {
        const authService = new AuthService()
        token &&
            authService
                .validate({ token })
                .then(response => console.log(response))
                .catch(err => console.log(err))
    }, [token])

    return <div>

        <h1>Home page</h1>
        <Link onClick={e => handleClick(e)}>Login</Link>
        <Link onClick={e => handleClick(e)}>Signup</Link>


        {selector === 'Login' ?
            <>
                <p>Please login to access your profile or signup if you don't have a profile ;)</p>
                <Login />
            </>
            :
            <>
                <p>Please signup to create a user and password ;)</p>
                <Signup />
            </>

        }

    </div>
}