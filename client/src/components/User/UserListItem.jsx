import React from 'react'
import '../User/user.css'
import { useHistory } from 'react-router-dom'

const UserListItem = ({ user }) => {

    const history = useHistory();


    const getUserProfile = () => {
        history.push(`/users/${user._id}`);
    }

    return (
        <div className='user-list-item-container' style={{cursor: 'pointer'}}>
            <div className='user-list-item' onClick={getUserProfile}>
                {user.image == undefined ? <div className="user-item-image-initial" style={{background: 'grey'}}><strong className="initial">{user.name.slice(0,1)}</strong></div> : <div className="user-item-image" style={{background: `url(${user.image})`}}></div>}
                <div className='user-item-data'>
                    <h5>{user.name}</h5>
                    <p>{user.age}</p>
                </div>
            </div>
        </div>
    )
}

export default UserListItem
