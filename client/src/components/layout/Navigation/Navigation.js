import { Link } from 'react-router-dom'
import './Navigation.css'

const Navigation = ({ loggedUser }) => {

    return (
        <>
            <nav className='navbar'>
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
                {loggedUser &&
                    <div className='options'>
                        <Link to="/profile">Profile</Link>
                        <button className='btn' style={{ backgroundColor: 'darkgoldenrod' }}>Logout</button>
                    </div>}
            </nav>
        </>
    )
}
export default Navigation