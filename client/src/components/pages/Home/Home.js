import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import AuthService from "../../../service/auth.service";
import Login from "../Login/Login";
import Signup from "../Signup/SignupForm";
import './Home.css'


export default function Home({ storeUser, ...props }) {
    const [selector, setSelector] = useState('Login')

    let { token } = useParams()
    let history = useHistory()

    useEffect(() => {
        const authService = new AuthService()
        token &&
            authService
                .validate({ token })
                .then(response => history.push('/'))
                .catch(err => console.log(err))
    }, [token, history])

    function handleClick(e) {
        e.preventDefault()
        const selectedName = e.target.innerHTML
        setSelector(selectedName)
    }

    return <div className='card'>
        <h1 className='title'>Home page</h1>
        <div className='selector'>
            <Link to='' className={selector === 'Login' ? 'selected' : ''} onClick={e => handleClick(e)}>Login</Link>
            <Link to='' onClick={e => handleClick(e)} className={selector === 'Signup' ? 'selected' : ''}>Signup</Link>
        </div>

        {selector === 'Login' ?
            <>
                <p style={{ textAlign: 'center' }}>Please login to access your profile or signup if you don't have a profile</p>
                <Login storeUser={storeUser} {...props} />
            </>
            :
            <>
                <p style={{ textAlign: 'center' }}>Please signup to create a user and password</p>
                <Signup />
            </>

        }

    </div>
}