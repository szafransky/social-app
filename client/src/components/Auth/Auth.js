import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import '../Auth/auth.css'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'

const Auth = () => {

    const initialFormState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''

    }

    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setformData] = useState(initialFormState);

    const swithMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    const handleChange = (e) => {
       setformData({ ...formData, [e.target.name]: e.target.value })
        console.log(formData);
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        if(isSignup) {
            dispatch(signup(formData, history));
            console.log("signup button");
            
        } else {
            dispatch(signin(formData, history));
        }
    }

    const googleSuccess = async (res) => {
        console.log(res);

        let result = res?.profileObj;
        console.log(result);

        let token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token }});
            history.push('/');
        } catch (error) {
            console.log(error);
            
        }
        
        
    }

    const googleFailure = (error) => {
        console.log('Google Sign In was unsuccesful. Try Again Later');
        console.log(error);
        
        
    }

    return (
        <div className="auth-container">
             <div class="form-auth">
            <h1>{isSignup ? "Sign Up" : "Sign In"}</h1>
            <form onSubmit={handleSubmit}>
                {isSignup && <>
                    <div class="mb-3">
                        <label for="firstName" class="form-label">First name</label>
                        <input onChange={handleChange} name="firstName" type="text" class="form-control" id="firstName" aria-describedby="fistName" autoFocus/>
                    </div>
                    <div class="mb-3">
                        <label for="lastName" class="form-label">Last name</label>
                        <input onChange={handleChange} name="lastName" type="text" class="form-control" id="lastName" />
                    </div>
                
                </>}
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input onChange={handleChange} name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoFocus/>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="inputPassword" class="form-label">Password</label>
                    <input onChange={handleChange} name="password" type="password" class="form-control" id="inputPassword" />
                </div>
                {isSignup && <>
                    <div class="mb-3">
                    <label for="inputPassword" class="form-label">Repeat Password</label>
                    <input onChange={handleChange} name="confirmPassword" type="password" class="form-control" id="inputPassword" />
                </div>
                </>}
                    
                    <div className="form-buttons">
                        <button type="submit" class="btn btn-primary sign-btn">{isSignup ? "Sign Up" : "Sign In"}</button>
                        <GoogleLogin
                            clientId="116820570739-81q7r12t9b3602furo2ul9khj7pfcrmj.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <button className="btn btn-primary google-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                    Google Sign In
                                </button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        
                    </div>
                    <div className="switcher">
                    <button type="button" onClick={swithMode} class="link-primary">{isSignup ? "Already have an account? Sign In" : "Dont have an account? Register"}</button>
                    </div>
               
            </form>
        </div>
        </div>
       
    )
}

export default Auth
