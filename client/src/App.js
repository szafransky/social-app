import React, { useEffect } from 'react'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import { useDispatch } from 'react-redux'
import { getPosts } from './actions/posts'

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(getPosts());

    }, [dispatch])


    return (
        <div className="app">
            <h1 className="mt-4 text-center">Social Club</h1>
            <div class="main-container container-fluid row mt-5 justify-content-center">
                <div className="post col-lg-6 col-sm-12">
                    <Posts />
                </div>
                <div className="form col-lg-3 col-sm-12">
                    <Form />
                </div>
            </div>
        </div>
    )
}

export default App



