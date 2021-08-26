import React, { useState, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { createPost } from '../../actions/posts'
import { updatePost } from '../../actions/posts'


function Form( {currentId, setCurrentId }) {


    //get the current ID in editing post mode
    const post = useSelector((state) => currentId ? state.posts.posts.find((post) => post._id === currentId) : null);

    const user = JSON.parse(localStorage.getItem('profile'));
   
    const dispatch = useDispatch();

    const [postData, setPostData] = useState({
        title: "",
        message: "",
        tags: "",
        selectedFile: ""
    });

    useEffect(() => {
        if(post) setPostData(post);
        console.log(postData);
        
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, { ... postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ... postData, name: user?.result?.name }));
        }
       
        console.log("Created");
        clear();
        
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: "",
            message: "",
            tags: "",
            selectedFile: ""
        });
    }

    if(!user?.result?.name) {
        return(
            <div className="mb-5">
            <h2>Please sign in to create a post</h2>
         </div>
        )
    }



    return (
        <form onSubmit={handleSubmit}>
             <div className="mb-5">
                <h2>{currentId ? 'Update post' : 'Create a post'}</h2>
             </div>
            <div className="mb-3">
            <label  className="form-label">Title</label>
            <input type="text" className="form-control" name='title' onChange={(e) => setPostData({...postData, title: e.target.value})} value={postData.title} />
            </div>
            <div className="mb-3">
            <label  className="form-label">Message</label>
            <input type="text" className="form-control" name='message' onChange={(e) => setPostData({...postData, message: e.target.value})} value={postData.message} />
            </div>
            <div className="mb-3">
            <label  className="form-label">Tags</label>
            <input type="text" className="form-control" name='tags' onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} value={postData.tags} />
            </div>
            <div className="mb-3">
            <label className="form-label">Select photo</label>
            <br></br>
            <FileBase type="file" multiple={false} className="form-control" name='selectedFile' onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
            </div>
            <div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" onClick={() => clear()} className="btn btn-danger mx-3">Clear</button>
            </div>
           
      </form>
    )
}

export default Form
