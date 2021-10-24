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
    const [errors, setErrors] = useState({})
    const [error, setError] = useState('')

    const authService = new AuthService()
    const uploadService = new UploadService()
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()

        handleValidation() &&
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
        const { name, value } = e.target;
        console.log(value);
        setInputValues({ ...inputValues, [name]: value });
        handleValidation()
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
    }

    const handleValidation = () => {
        let errors = {};
        let formIsValid = true;
        if (!props.isLogin) {
            //Name
            if (!inputValues["name"]) {
                formIsValid = false;
                errors["name"] = "Cannot be empty";
            }

            if (typeof inputValues["name"] !== "undefined") {
                if (!inputValues["name"].match(/^[a-zA-Z]+$/)) {
                    formIsValid = false;
                    errors["name"] = "Only letters";
                }
            }

            //surname
            if (!inputValues["surname"]) {
                formIsValid = false;
                errors["surname"] = "Cannot be empty";
            }

            if (typeof inputValues["surname"] !== "undefined") {
                if (!inputValues["surname"].match(/^[a-zA-Z]+$/)) {
                    formIsValid = false;
                    errors["surname"] = "Only letters";
                }
            }
        }

        //Email
        if (!inputValues["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (typeof inputValues["email"] !== "undefined") {
            let lastAtPos = inputValues["email"].lastIndexOf("@");
            let lastDotPos = inputValues["email"].lastIndexOf(".");

            if (
                !(
                    lastAtPos < lastDotPos &&
                    lastAtPos > 0 &&
                    inputValues["email"].indexOf("@@") === -1 &&
                    lastDotPos > 2 &&
                    inputValues["email"].length - lastDotPos > 2
                )
            ) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        //Password
        if (!inputValues["password"]) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }
        if (inputValues["password"].length < 4) {
            formIsValid = false;
            errors["password"] = "At least 5 letters long";
        }
        console.log('hola');
        setErrors({ ...errors })
        return formIsValid;
    }

    return <form onSubmit={handleSubmit} >
        <div className='form-label'>
            <label >Email</label>
            <input name='email' type="email" onChange={e => handleChange(e)} autoComplete="on" required
                className={errors.email && 'border-red'} />
        </div>
        <div style={{ textAlign: 'end', margin: '0 50px 0 170px' }}>
            <span style={{ color: 'darkred', fontSize: '0.8em' }}>{errors.email}</span>
        </div>
        <div className='form-label'>
            <label >Password</label>
            <input type="password" name='password' onChange={e => handleChange(e)} autoComplete="on" required
                placeholder={!props.isLogin && "At least 5 characters"}
                className={errors.password && 'border-red'} />
        </div>
        <div style={{ textAlign: 'end', margin: '0 50px 0 170px' }}>
            <span style={{ color: 'darkred', fontSize: '0.8em' }}>{errors.password}</span>
        </div>
        {!props.isLogin &&
            <>
                {console.log(errors)}
                <div className='form-label'>
                    <label >Name</label>
                    <input type="text" className={errors.name && 'border-red'} name='name' onChange={e => handleChange(e)} autoComplete="on" />
                </div>
                <div style={{ textAlign: 'end', margin: '0 50px 0 170px' }}>
                    <span style={{ color: 'darkred', fontSize: '0.8em' }}>{errors.name}</span>
                </div>
                <div className='form-label'>
                    <label >Surname</label>
                    <input type="text" className={errors.surname && 'border-red'} name='surname' onChange={e => handleChange(e)} autoComplete="on" />
                </div>
                <div style={{ textAlign: 'end', margin: '0 50px 0 170px' }}>
                    <span style={{ color: 'darkred', fontSize: '0.8em' }}>{errors.surname}</span>
                </div>
                <div className='form-label'>
                    <label >Profile picture</label>
                    <input type="file" onChange={onFileChange} accept='image/*' />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button onClick={onFileUpload} style={{ fontSize: '1em' }}>{inputValues.profilePicture ? 'Done' : 'Upload!'}</button>
                </div>
            </>}
        <div className='submit-row'>
            <button type="submit" disabled={isUploading} className='btn'>{props.isLogin ? 'Login' : 'Signup'}</button>
        </div>
        <h3 style={{ color: 'darkred', textAlign: 'center' }}>
            {error}
        </h3>
    </form>


}