import React,{ useState } from 'react'
import '../Post/Post.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'
import { useHistory } from 'react-router-dom';

function Post( { post, setCurrentId } ) {

    let user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const history = useHistory();
    const [likes, setLikes] = useState(post?.likes)
    const userId = user?.result.googleId || user?.result._id;

    const openPost = (e) => {

        console.log(e.target.tagName);
        console.log(e.currentTarget.tagName);
        
        if(e.target.tagName !== 'H5') {
           history.push(`/posts/${post._id}`);
            
        } else {
            
        }

      
    }

    const handleLike = async () => {
        dispatch(likePost(post._id));
        console.log(likes.includes((userId)));
        
        if(likes.includes((userId))) {
            console.log("Inside like");
            
            setLikes(likes.filter((id) => id !== userId));
        } else {
            setLikes([...likes, userId]);
        }
    }
    
    return (
        <div class="col-lg-6 col-md-8 col-sm-12">
            <div class="card mb-3" style={{flex: "none", borderRadius: "10px", minHeight: "300px"}}>
                <div onClick={(e) => openPost(e)} className='card-body-cursor'>
                    <div class="card-img-top" style={{height: "200px", background: `url(${post.selectedFile})`, backgroundPosition: "center", backgroundSize: "cover", borderTopRightRadius: "10px", borderTopLeftRadius: "10px"}}  alt="photo" >
                        <div className='wrapper'>
                        <div>
                            <h2 className="post-author">{post.name}</h2>
                            <h2 className="post-createdAt">{moment(post.createdAt).fromNow()}</h2>
                        </div>
                        {(user?.result?.googleId === post?.author || user?.result?._id === post?.author) && <h5 className="three-dots" onClick= {() => setCurrentId(post._id)}>...</h5>}
                        </div>
                    

                        
                    </div>
                    <div class="card-body">

                        {post.tags.length > 0 ? <p class="card-text">{post.tags.map(el => `#${el} `)}</p> : ""}
                        <h5 class="card-title">{post.title}</h5>
                        <p class="card-text">{post.message}</p>
                    </div>
                </div>
                
                    <div class='icons-container'>
                        <div  className="like-button">
                            <button onClick={handleLike} disabled={!user?.result} class={user?.result ? likes.includes((user?.result?._id || user?.result?.googleId)) ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up" : "bi bi-hand-thumbs-up disabled"}></button> 
                            <p class={!user?.result ? "disabled" : ""}>{likes.length > 0 ? `Like ${likes.length}` : `Like ${likes.length}`} </p> 
                        </div>
                        {(user?.result?.googleId === post?.author || user?.result?._id === post?.author) && <button class="bi bi-trash" onClick={() => {dispatch(deletePost(post._id))}}></button>}
                    
                    </div>
                </div>
            
        </div>
    )
}

export default Post
