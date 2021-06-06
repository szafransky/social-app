import React from 'react'

function Post( {post} ) {

    console.log(post);
    
    return (
        <div class="col-lg-6 col-md-8 col-sm-12">
        <div class="card mx-1 my-3" style={{flex: "none", borderRadius: "10px", minHeight: "400px"}}>
            <div style={{height: "200px", background: `url(${post.selectedFile})`, backgroundPosition: "center", backgroundSize: "cover", borderTopRightRadius: "10px", borderTopLeftRadius: "10px"}} class="card-img-top" alt="photo" />
            <div class="card-body">
            <h5 class="card-title">{post.title}</h5>
            <p>{post.author}</p>
            <p class="card-text">{post.message}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        </div>
    )
}

export default Post
