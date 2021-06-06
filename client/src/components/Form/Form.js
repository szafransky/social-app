import React, { useState } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost } from '../../actions/posts'

function Form() {

    const dispatch = useDispatch();

    const [postData, setPostData] = useState({
        author: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost(postData));
        console.log("Created");
        
    }



    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label  className="form-label">Creator</label>
            <input type="text" className="form-control" name='creator' onChange={(e) => setPostData({...postData, author: e.target.value})} value={postData.author} />
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
            <input type="text" className="form-control" name='tags' onChange={(e) => setPostData({...postData, tags: e.target.value})} value={postData.tags} />
            </div>
            <div className="mb-3">
            <label className="form-label">Select photo</label>
            <br></br>
            <FileBase type="file" multiple={false} className="form-control" name='selectedFile' onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
            </div>
           
            <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
}

export default Form
