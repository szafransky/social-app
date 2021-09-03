import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { getPost, getPostsBySearch } from '../../actions/posts'

import '../PostDetails/singlePost.css'
import CommentSection from './CommentSection'

const PostDetails = () => {
    
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
       
        dispatch(getPost(id))

    }, [id])

    useEffect(() => {
       
        if(post) dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',')}))

    }, [post])

    const openPost = (e, id) => {

        console.log(e.target.tagName);
        console.log(e.currentTarget.tagName);
        
        if(e.target.tagName !== 'H5') {
            console.log('w srodku');
            
           history.push(`/posts/${id}`);
            
        } else {
            
        }

      
    }
    


    if(isLoading) {
       
    }
    
    if(!post) return  <div class="row align-items-center justify-content-center loader"><div class="spinner-border mt-5 d-flex" role="status"></div></div>;

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
    console.log(recommendedPosts);
    
   
    return (
        <>
       
         <div className="single-post-container">
         <div className="single-post-details">
             <div className="post-body">
                 <h5 className="post-title">{post.title}</h5>
                 {post.tags.length > 0 ? <p class="post-tag">{post.tags.map(el => `#${el} `)}</p> : ""}
                 <p className="post-text">{post.message}</p>
                 <h2 className="post-author">Created by: {post.name}</h2>
                 <p className="post-text">{moment(post.createdAt).fromNow()}</p>
                 <div className='chat'>Real time chat - Coming soon!</div>
                 <div className='comments'>
                     <CommentSection post={post} />
                 </div>
             </div>
         </div>
         <div className='single-post-image' style={{background: `url(${post.selectedFile})`, backgroundPosition: "center", backgroundSize: "cover", borderRadius: "10px"}}  alt="photo"></div>
         
     </div>
        
       
        {recommendedPosts.length > 0  ? (
        <div className="recommended-posts-container">
             <h2 className="title">You might also like: </h2>
             <div className='recommended-posts'>
                {recommendedPosts.map((post, key) => {
                    if(key < 4) {
                        return <div class="col-lg-3 col-md-4 col-sm-12 card-border">
                                        <div class="card mx-4 mb-3" style={{flex: "none", borderRadius: "10px", minHeight: "300px"}}>
                                            <div onClick={(e) => openPost(e, post._id)} className='card-body-cursor'>
                                                <div class="card-img-top" style={{height: "200px", background: `url(${post.selectedFile})`, backgroundPosition: "center", backgroundSize: "cover", borderTopRightRadius: "10px", borderTopLeftRadius: "10px"}}  alt="photo" >
                                                <div className='wrapper'>
                                                <div>
                                                <h2 className="post-author">{post.name}</h2>
                                                <h2 className="post-createdAt">{moment(post.createdAt).fromNow()}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        {post.tags.length > 0 ? <p class="card-text">{post.tags.map(el => `#${el} `)}</p> : ""}
                                        <h5 class="card-title">{post.title}</h5>
                                        <p class="card-text">{post.message}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    }
                })}
             </div>
        </div>
        ) : recommendedPosts.length !== 0 ? <div class=" row align-items-center justify-content-center"><div class="spinner-border mt-5 d-flex" role="status"></div></div> : null}
    </>


    )
}

export default PostDetails
