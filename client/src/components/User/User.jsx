import React, { useEffect, useState } from 'react'
import '../User/user.css'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getUser, updateUser } from '../../actions/auth'
import FileBase from 'react-file-base64'

const User = () => {


    const user = JSON.parse(localStorage.getItem('profile'));
    const { showUser, isLoading } = useSelector((state) => state.auth) ;
    const [showUserProfile, setShowUserProfile] = useState(null);
    const [isChanged, setIsChanged] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isLoggedUser, setisLoggedUser] = useState(false);

    console.log(isLoading);
    

    const handleEdit = (e) => {
        
        if(e.target.name === 'age' && e.target.value > 100) return;
         setIsChanged(true);
        setShowUserProfile({ 
            ...showUserProfile,
            [`${e.target.name}`]: e.target.value
        })
        
    }


    const submitUserData = (e) => {
        e.preventDefault();
        console.log(showUserProfile);
        setIsChanged(false);
        localStorage.setItem('profile', JSON.stringify({...user, result: showUserProfile}));
        
        dispatch(updateUser(id, showUserProfile));
    }

    const updatePhoto = (e, photo) => {
        console.log('Update photo');
        
        setIsChanged(true);
        setShowUserProfile({ 
            ...showUserProfile,
            image: photo
        })
    }

    useEffect(() => {
        dispatch(getUser(id));
    }, [id])
    

    useEffect(() => {
        
        if(user?.result?._id === id) {
            setShowUserProfile(user.result);
            setisLoggedUser(true);
        } else {
            setShowUserProfile(showUser);
            setisLoggedUser(false);
        }
    }, [showUser])


    //set up update user on frontend

    if(isLoading) return  <div class="row align-items-center justify-content-center loader"><div class="spinner-border mt-5 d-flex" role="status"></div></div>

    return (
        <div className="single-user-container">
        {showUserProfile?.image == undefined ? <div className="single-user-image" style={{background: 'grey'}}><strong className="initial">{showUserProfile?.name.slice(0,1)}</strong></div> : <div className="single-user-image" style={{background: `url(${showUserProfile?.image})`, backgroundPosition: 'center', backgroundSize: 'cover', borderRadius: "10px"}}></div>}
         <div className="user-details">
             <div className="user-body">
                
                
                   
                    <form onSubmit={submitUserData}>
                        <h5 className="user-name">{showUserProfile?.name}</h5>
                        <div style={{display: 'flex'}}>
                            <strong className="user-age">Age: </strong>
                            <input type="number" name="age" disabled={!isLoggedUser} onChange={handleEdit} value={showUserProfile?.age} placeholder={showUserProfile?.age ? '' : 'Set up your age'}></input>
                        </div>
                        <div className='bio' style={{display: 'flex'}}>
                            <strong className="user-bio">Bio: </strong>
                            <textarea name="bio" disabled={!isLoggedUser} onChange={handleEdit} value={showUserProfile?.bio} placeholder={showUserProfile?.bio ? '' : 'Set up your bio'}></textarea>
                        </div>
                       
                        {isLoggedUser && <>
                            <strong className="user-bio">Image: </strong>
                            <FileBase  className="form-control change-photo-input" type="file" id='file' name="image" multiple={false} onDone={({e, base64}) => {
                            // setShowUserProfile({...showUserProfile, image: base64});
                            updatePhoto(e, base64);
                            
                            
                        }} /> 
                        <br></br>
                        {!isLoading ? <button type='submit' disabled={!isChanged} className='btn btn-outline-primary mt-3'>Change user data</button> : <button style={{width: '156px'}} className="btn btn-primary mt-3" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span class="sr-only">Loading...</span>
                            </button>}
                        </>}
                        
                    </form>
                    
                
                
             </div>
         </div> 
     </div>
    )
}

export default User
