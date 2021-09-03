import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../actions/auth';
import UserListItem from './UserListItem';
import '../User/user.css'

const UserList = () => {

    const dispatch = useDispatch();
    const { users, isLoading } = useSelector((state) => state.auth);
    // const [usersList, setUsersList] = useState([]);


    useEffect(() => {
       dispatch(getUsers());
        
    }, [])

    if(users.length === 0) return <div class="row align-items-center justify-content-center loader"><div class="spinner-border mt-5 d-flex" role="status"></div></div>;

    if(isLoading) return <div class="row align-items-center justify-content-center loader"><div class="spinner-border mt-5 d-flex" role="status"></div></div>;

    

    return (
        <div className="user-list-container">
            {users.map((user) => <UserListItem user={user} />)}
        </div>
    )
}

export default UserList
