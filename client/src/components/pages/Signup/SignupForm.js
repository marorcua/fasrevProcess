import { useState } from "react"
import { useHistory } from "react-router"
import AuthService from "../../../service/auth.service"
import UploadService from "../../../service/upload.service"
import './SignupForm.css'


export default function SignupForm(props) {
    const [inputValues, setInputValues] = useState({
        email: '',
        password: '',
        profilePicture: ''
    })
    const [selectedFile, setSelectedFile] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState('')

    const authService = new AuthService()
    const uploadService = new UploadService()
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()

        props.isLogin ?
            authService
                .login(inputValues)
                .then(response => props.storeUser(response.data))
                .then(() => history.push('/profile'))
                .catch(err => {
                    console.log(err)
                    setError(err.response.data.message)
                })
            :
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

    const onFileChange = event => {
        setSelectedFile(event.target.files[0])

    };

    const onFileUpload = e => {
        e.preventDefault()
        setIsUploading(true)

        const formData = new FormData();

        formData.append(
            "file",
            selectedFile
        )

        // Request made to the backend api
        // Send formData object
        uploadService
            .uploadImage(formData)
            .then(response => {
                console.log(response.data.filename)
                setInputValues({ ...inputValues, profilePicture: response.data.filename })
                setIsUploading(false)
            })
            .catch(err => console.log(err))
    };

    return <form onSubmit={handleSubmit} >
        <div className='form-label'>
            <label >Email</label>
            <input name='email' type="email" onChange={e => handleChange(e)} autoComplete="on" />
        </div>
        <div className='form-label'>
            <label >Password</label>
            <input type="password" name='password' onChange={e => handleChange(e)} autoComplete="on" />
        </div>
        {!props.isLogin &&
            <div className='form-label'>
                <label >Profile picture</label>
                <input type="file" onChange={onFileChange} accept='image/*' />
                <button onClick={onFileUpload}>Upload!</button>
            </div>}
        <div className='submit-row'>
            <button type="submit" disabled={isUploading} className='btn'>{props.isLogin ? 'Login' : 'Signup'}</button>
        </div>
        <h3 style={{ color: 'darkred', textAlign: 'center' }}>
            {error}
        </h3>
    </form>


}