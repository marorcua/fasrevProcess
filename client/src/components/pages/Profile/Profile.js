import AuthService from '../../../service/auth.service'
import './Profile.css'


export default function Profile(props) {
    const authService = new AuthService()
    const eliminateProfile = e => {
        authService
            .deleteUser(props.loggedUser._id)
            .then(() => {
                authService
                    .logout()
                    .then(() => props.history.push('/'))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const editProfile = e => {

    }

    return <div className='card text-center'>
        <h2>Datos de Perfil:</h2>
        <img className='profile-pic' src={`${process.env.REACT_APP_BASE_URL}/auth/${props.loggedUser.profilePicture}`} alt='profile' />
        <p>Email: {props.loggedUser.email}</p>
        <button onClick={editProfile}>Edit</button>
        <button onClick={eliminateProfile}>Eliminate</button>
    </div>

}