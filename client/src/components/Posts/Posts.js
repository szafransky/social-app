import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux'

function Posts( { setCurrentId }) {

    const { posts, isLoading } = useSelector((state) => state.posts);

    if(!posts.length && !isLoading) return 'No posts';

    if(isLoading) return <div class="row align-items-center justify-content-center"><div class="spinner-border mt-5 d-flex" role="status"></div></div>

    return (
        <div class="row align-items-center">
           
            { (posts.map((el, key) => {
                  return <Post post={el} setCurrentId={setCurrentId} />
               }))}
            
        </div>
    )
}

export default Posts
