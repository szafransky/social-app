import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux'

function Posts( { setCurrentId }) {

    const { posts, isLoading } = useSelector((state) => state.posts);

    if(isLoading) return <div class="row align-items-center justify-content-center"><div class="spinner-border mt-5 d-flex" role="status"></div></div>

    return (
        <div class="row align-items-center">
           
            {posts.length != 0 ? (posts.map((el, key) => {
                  return <Post post={el} setCurrentId={setCurrentId} />
               })) : <div class="row align-items-center justify-content-center"><h2 className="mt-5 d-flex justify-content-center">No posts found</h2></div>}
            
        </div>
    )
}

export default Posts
