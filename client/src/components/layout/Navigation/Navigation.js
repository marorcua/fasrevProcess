import { Link, useHistory } from 'react-router-dom'
import AuthService from '../../../service/auth.service'
import './Navigation.css'

const Navigation = ({ loggedUser, storeUser }) => {
    const authService = new AuthService()
    let history = useHistory()

    function logout(e) {
        e.preventDefault()
        authService
            .logout()
            .then(() => storeUser(""))
            .then(() => history.push('/'))
            .catch(err => console.log(err))
    }

    return (
        <>
            <nav className='navbar'>
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
                {loggedUser._id &&
                    <div className='options'>
                        <Link to="/profile">Profile</Link>
                        <button className='btn' style={{ backgroundColor: 'darkgoldenrod' }} onClick={e => logout(e)}>Logout</button>
                    </div>}
            </nav>
        </>
    )
}
export default Navigation