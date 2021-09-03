import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'
import { useSelector } from 'react-redux'
import Footer from './components/Footer/Footer'
import User from './components/User/User'
import UserList from './components/User/UserList'



function App() {

    const { authData } = useSelector((state) => state.auth);
    console.log(authData);
    

   let user = JSON.parse(localStorage.getItem('profile'));

   console.log(user);
   console.log("user in app");
   
   useEffect(() => {
    user = JSON.parse(localStorage.getItem('profile'));

    console.log(user);
    
      
   }, [JSON.parse(localStorage.getItem('profile'))])


    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />
                <Switch>
                    <Route path='/' exact component={() => <Redirect to='/posts' />}/>
                    <Route path='/posts' exact component={Home} />
                    <Route path='/posts/search' exact component={Home} />
                    <Route path='/posts/:id' exact component={PostDetails} />
                    <Route path='/auth' exact component={() => (!user ? <Auth /> : <Redirect to='/posts' />)} />
                    <Route path='/users/:id' exact component={User} />
                    <Route path='/users' exact component={UserList} />
                </Switch>
                <Footer />
            </div>
        </BrowserRouter>
    )
}

export default App



