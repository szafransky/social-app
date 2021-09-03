import React, { useState, useEffect } from 'react'
import { GoogleLogin } from 'react-google-login'
import '../Auth/auth.css'
import { useDispatch, useSelector } from 'react-redux'
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
    const [disabled, setDisabled] = useState(true)
    const { authData, isLoading } = useSelector((state) => state.auth)

    console.log(authData);

    console.log(disabled);
    
    
    

    const [error, setError] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });


    const handleChange = (e) => {
        
        setformData({...formData, [`${e.target.id}`]: e.target.value})
        setError({
            ...error,
            [`${e.target.name.toLowerCase()}`]: ''
        })

        if(e.target.value === ''){
            console.log("Inside new error");
            setDisabled(true)
            setError({
                ...error,
                [`${e.target.id}`]: `${e.target.name} cannot be empty`
            })
        } else if(e.target.name === 'Confirm Password') {
            if(formData.password !== e.target.value) {
                setError({
                    ...error,
                    [`${e.target.name.toLowerCase()}`]: `${e.target.name} must be the same as password`
                })
            }

        }
    }

    const swithMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setformData(initialFormState);
    }

    // const handleChange = (e) => {
    //    setformData({ ...formData, [e.target.name]: e.target.value })
    //     console.log(formData);
        
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        if(isSignup) {
            dispatch(signup(formData, history));
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


    useEffect(() => {
        if(isSignup) {
            if(formData.name !== '' && formData.surname !== '' && formData.email !== '' && formData.password !== '') {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        } else {
            if(formData.email !== '' && formData.password !== '') {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        }
       
    }, [formData])

    return (
        <div className="auth-container">
             <div class="form-auth">
            <h1 className='mb-3'>{isSignup ? "Sign Up" : "Sign In"}</h1>
            <form onSubmit={handleSubmit}>
                {isSignup && <>
                    <div class="mb-3">
                        <label for="firstName" class="form-label">First name</label>
                        <input onChange={(e) => handleChange(e)} name="Name" id='firstName' type="text" className={`form-control ${error.name && 'error-border'}`} aria-describedby="fistName" autoFocus/>
                        { error.name !== '' && <p style={{ color: "red" }}>{error.name}</p> }
                    </div>
                    <div class="mb-3">
                        <label for="lastName" class="form-label">Last name</label>
                        <input onChange={handleChange} name="Surname" id='lastName' type="text" className={`form-control ${error.surname && 'error-border'}`} />
                        { error.surname !== '' && <p style={{ color: "red" }}>{error.surname}</p> }
                    </div>
                
                </>}
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input onChange={handleChange} name="Email" id='email' type="email" className={`form-control ${error.email && 'error-border'}`} aria-describedby="emailHelp" autoFocus/>
                    {!error.email && <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>}
                    { error.email !== '' && <p style={{ color: "red" }}>{error.email}</p> }
                </div>
                <div class="mb-3">
                    <label for="inputPassword" class="form-label">Password</label>
                    <input onChange={handleChange} name="Password" id="password" type="password" className={`form-control ${error.password && 'error-border'}`} />
                    { error.password !== '' && <p style={{ color: "red" }}>{error.password}</p> }
                </div>
                {isSignup && <>
                    <div class="mb-1">
                    <label for="inputPassword" class="form-label">Repeat Password</label>
                    <input onChange={handleChange} name="ConfirmPassword" id="confirmPassword" type="password" className={`form-control ${error.confirmPassword && 'error-border'}`} />
                    { error.confirmPassword !== '' && <p style={{ color: "red" }}>{error.confirmPassword}</p> }
                    
                </div>
                
                </>}
                <div style={{height: '30px', marginBottom: '8px'}}>
                    {authData?.message && <p style={{color: 'red'}}>{authData.message}</p>}
                </div>
                
                    <div className="form-buttons">
                        {!isLoading ? <button disabled={disabled} type="submit" class="btn btn-primary sign-btn">{isSignup ? "Sign Up" : "Sign In"}</button> : <button class="btn btn-primary sign-btn" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span class="sr-only">Loading...</span>
                            </button>}
                        {/* <GoogleLogin
                            clientId="116820570739-81q7r12t9b3602furo2ul9khj7pfcrmj.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <button className="btn btn-primary google-btn" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                    Google Sign In
                                </button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        /> */}
                        
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
