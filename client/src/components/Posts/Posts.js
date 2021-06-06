import React from 'react'
import Post from './Post/Post'
import { useSelector } from 'react-redux'

function Posts() {

    const posts = useSelector((state) => state.posts);
    console.log(posts);
    
    return (
        <div class="row align-items-center">
           
            {
                 !posts.length ? 
                 <div class="spinner-border mt-5" role="status">
                
               </div> : (posts.map((el, key) => {
                   console.log(el);
                   
                     return <Post post={el}/>
               }))
            }
            
        </div>
    )
}

export default Posts
