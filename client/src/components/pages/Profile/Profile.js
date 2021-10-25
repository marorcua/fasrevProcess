import AuthService from '../../../service/auth.service'
import './Profile.css'
import profilePic from './blank-profile-picture-973460_640.png'
import { useState } from 'react'
import SignupForm from '../Signup/SignupForm'

export default function Profile(props) {
    const [editProfile, setEditProfile] = useState(false)

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


    return (
        editProfile ?
            <div className='card text-center'>
                <h2>Edit your profile</h2>
                <SignupForm isEdit={true} loggedUser={props.loggedUser} cancelEdit={() => setEditProfile(false)} storeUser={props.storeUser} />
            </div>
            :
            <div className='card text-center'>
                <h2>Datos de Perfil:</h2>
                <small style={{ display: 'block', width: '100%' }}>Change your profile pic by clicking on Edit</small>
                <img className='profile-pic'
                    src={props.loggedUser.profilePicture ? `${process.env.REACT_APP_BASE_URL}/auth/${props.loggedUser.profilePicture}` : profilePic}
                    alt='profile' />

                <p>Name: {props.loggedUser.name}</p>
                <p>Surname: {props.loggedUser.surname}</p>
                <p>Email: {props.loggedUser.email}</p>
                <button onClick={() => setEditProfile(true)} className='btn'>Edit</button>
                <button onClick={eliminateProfile} className='btn red-btn'>Eliminate</button>
            </div>)

}