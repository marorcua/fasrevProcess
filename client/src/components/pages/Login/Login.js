import SignupForm from "../Signup/SignupForm"




const Login = (props) => {


    return <div>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <SignupForm isLogin={true} {...props} />
    </div>


}

export default Login