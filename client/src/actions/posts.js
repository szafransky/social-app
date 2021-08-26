import * as api from '../api'


//action creators

export const getPosts = (page) => async (dispatch) => {

    try {

        dispatch({ type: 'START_LOADING' });
        const { data } = await api.fetchPosts(page);
        const action = { type: 'FETCH_ALL', payload: data };
        dispatch(action);
        dispatch({ type: 'END_LOADING' });

    } catch (error) {
        console.log(error.message);
        
    }
}

export const createPost = (post) => async (dispatch) => {
    console.log("create post API");
    
    
    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.createPost(post);
        console.log("inside create post API");
        const action = { type: 'CREATE', payload: data };
        dispatch(action);
        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error.message);
        
    }
}

export const updatePost = (id, post) => async (dispatch) => {

    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: 'UPDATE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = id => async (dispatch) => {

    try {
        
        await api.deletePost(id);
        dispatch({ type: 'REMOVE', payload: id });
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = id => async (dispatch) => {

    try {
        const { data } = await api.likePost(id);
        console.log("post id in api");
        console.log(data);
        
        console.log(data._id);
        
        
        dispatch({ type: 'LIKE', payload: data });
    } catch (error) {
        console.log(error.message);
    }
}


export const commentPost = (value, id) => async (dispatch) => {

    try {
        const { data } = await api.comment(value, id);
        console.log(data);

        dispatch({ type: 'COMMENT', payload: data })

        return data.comments;
        
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {

    try {
        dispatch({ type: 'START_LOADING' })
        console.log("In the search");

        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

        console.log("Data from search");
        console.log(data);
        
        
        
       dispatch({ type: 'FETCH_ALL_BY_SEARCH', payload: data })
       dispatch({ type: 'END_LOADING' });
        
    } catch (error) {
        console.log("tutaaaaaaj");
        
        console.log(error);
        
    }
}

export const getPost = (id) => async (dispatch) => {

    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.fetchPost(id);

        dispatch({ type: 'FETCH_POST', payload: data });
        dispatch({ type: 'END_LOADING' });
        
    } catch (error) {
        console.log(error);
    }

}

 