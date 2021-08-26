import React, { useState, useEffect } from 'react'
import '../Navbar/navbar.css'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

function Navbar() {

    // const user = null;
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    }
    

    useEffect(() => {
       
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

    }, [location])

    let imageUrl = user?.result?.imageUrl != undefined ? user.result?.imageUrl : "";

    const openHome = () => {
        history.push('/');
    }
    

    return (
        <div className="nav-bar">
            <nav>
                {/*  */}
                    <div></div>
                    <h1 onClick={openHome}  className="py-4 text-center logo">Szafranski SocialNet</h1>
                    <div class="user-container">
                        {user ? <><div className="user-data">
                        {imageUrl == "" ? <div className="user-photo" style={{background: 'grey'}}><strong className="initial">{user.result.name.slice(0,1)}</strong></div> : <div className="user-photo" style={{background: `url(${imageUrl})`, backgroundPosition: 'center', backgroundSize: 'contain'}}></div>}
                            <p>{user.result.name}</p>
                        </div>
                            <Link onClick={logout} class="btn btn-outline-primary">Log out</Link>
                        </>
                         : <Link to='/auth' class="btn btn-outline-primary">Log in</Link>}
                    </div>
                {/* </Link> */}
                
            </nav>
        </div>
    )
}

export default Navbar
