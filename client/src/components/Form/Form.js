import React, { useState, useEffect, useRef } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { createPost } from '../../actions/posts'
import { updatePost } from '../../actions/posts'

import '../Form/form.css'


function Form( {currentId, setCurrentId }) {


    //get the current ID in editing post mode
    const post = useSelector((state) => currentId ? state.posts.posts.find((post) => post._id === currentId) : null);

    const user = JSON.parse(localStorage.getItem('profile'));
   
    const dispatch = useDispatch();

    const [disabled, setDisabled] = useState(true)

    const firstRender = useRef(true);

    const [postData, setPostData] = useState({
        title: "",
        message: "",
        tags: "",
        selectedFile: ""
    });


    const [error, setError] = useState({
        title: '',
        message: '',
        tags: ''
    });


    const handleChange = (e) => {
        setPostData({...postData, [`${e.target.name.toLowerCase()}`]: e.target.value})
        // setDisabled(false);
        setError({
            ...error,
            [`${e.target.name.toLowerCase()}`]: ''
        })

        if(e.target.value === ''){
            console.log("Inside new error");
            setDisabled(true)
            setError({
                ...error,
                [`${e.target.name.toLowerCase()}`]: `${e.target.name} cannot be empty`
            })
        } else if(e.target.name === 'Message') {
            if(e.target.value.length > 1300) {
                setError({
                    ...error,
                    [`${e.target.name.toLowerCase()}`]: `${e.target.name} cannot exceed 1300 letters`
                })
            }

        }
    }

    useEffect(() => {
        if(post) setPostData(post);

        if(firstRender.current) {
            firstRender.current = false;
            return
        }

        if(postData.title !== '' && postData.message !== '' && postData.tags !== '' && !error.message) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        
    }, [post, postData]);

    const handleSubmit = (e) => {

        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, { ... postData, name: user?.result?.name }));
        } else {
            dispatch(createPost({ ... postData, name: user?.result?.name }));
        }
       
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
        setError({
            title: '',
            message: '',
            tags: ''
        })
    }

    if(!user?.result?.name) {
        return(
            <div className="mb-5">
            <h2>Please sign in to create a post</h2>
         </div>
        )
    }



    return (
        <form class="post-form" onSubmit={handleSubmit}>
             <div className="mb-5">
                <h2>{currentId ? 'Update post' : 'Create a post'}</h2>
             </div>
            <div className="mb-3">
            <label  className="form-label">Title</label>
            <input type="text" className={`form-control ${error.title && 'error-border'}`} name='Title' onChange={(e) => handleChange(e)} value={postData.title} />
            { error.title !== '' && <p style={{ color: "red" }}>{error.title}</p> }
            </div>
            <div className="mb-3">
            <label  className="form-label">Message</label>
            <textarea style={{}} type="text" className={`form-control ${error.message && 'error-border'}`} name='Message' onChange={(e) => handleChange(e)} value={postData.message} />
            { error.message !== '' && <p style={{ color: "red" }}>{error.message}</p> }
            </div>
            <div className="mb-3">
            <label  className="form-label">Tags</label>
            <input type="text" className={`form-control ${error.tags && 'error-border'}`} name='Tags' onChange={(e) => handleChange(e)} value={postData.tags} />
            { error.tags !== '' && <p style={{ color: "red" }}>{error.tags}</p> }
            </div>
            <div className="mb-3">
            <label className="form-label">Select photo</label>
            <br></br>
            <FileBase type="file" multiple={false} className="form-control" name='selectedFile' onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
            </div>
            <div>
                <button disabled={disabled} type="submit" className="btn btn-primary">Submit</button>
                <button type="button" onClick={() => clear()} className="btn btn-danger mx-3">Clear</button>
            </div>
           
      </form>
    )
}

export default Form
