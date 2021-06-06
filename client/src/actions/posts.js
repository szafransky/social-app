import * as api from '../api'


//action createors

export const getPosts = () => async (dispatch) => {

    try {
        const { data } = await api.fetchPosts();

        const action = { type: 'FETCH_ALL', payload: data };
        dispatch(action);

    } catch (error) {
        console.log(error.message);
        
    }
}

export const createPost = (post) => async (dispatch) => {
    console.log("create post API");
    
    
    try {
        const { data } = await api.createPost(post);
        console.log("inside create post API");
        const action = { type: 'CREATE', payload: data };
        dispatch(action);
    } catch (error) {
        console.log(error.message);
        
    }
}