import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import '../PostDetails/singlePost.css'
import { commentPost } from '../../actions/posts';


const CommentSection = ({ post }) => {
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsRef = useRef();

    console.log(post);
    console.log(user?.result?.name);
    

    const handleClick = async () => {
        const finalComment = `${user?.result?.name}: ${comment}`;
        dispatch(commentPost(finalComment, post._id));
        setComments([...comments, finalComment]);
        setComment('');
        commentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
    
    return (
        <div className='container-all'>
            <div className='comments-container'>
            <h4 className='comments-title'>Comments</h4>
            <div className='comments-scroller'>
                {comments.map((comment, key) => (
                        <p className='comment-text' key={key}><strong>{comment.split(': ')[0]}</strong>: {comment.split(': ')[1]}</p>
                        
                    ))}
                    <div ref={commentsRef}></div>
            </div>
                
            </div>
            {user &&  (<div className='text-field'>
                <h4 className='comments-title'>Write a comment</h4>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} class="form-control" id="comment-message" rows="3"></textarea>
                <button type="button" onClick={handleClick} disabled={!comment} class="btn btn-outline-primary mt-2">Comment</button>
            </div>)}
           
        </div>
    )
}

export default CommentSection
