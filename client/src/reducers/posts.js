
//this reducer will contain all action on posts which is get, create etc.
//in another file we have specified the actions for getting the posts and creating the post
//we use switch instead of if
//we will use this function inside combineReducers function in index.js file. it will be one of the reducers

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true }
        case 'END_LOADING':
            return { ...state, isLoading: false }
        case 'FETCH_ALL':
            return {
                ...state, 
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case 'FETCH_ALL_BY_SEARCH':
            return {
                ...state, posts: action.payload
            };
        case 'FETCH_POST':
            return {
                ...state, post: action.payload
            };
        case 'CREATE':
            return { ...state, posts: [action.payload, ...state.posts]};
        case 'REMOVE':
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload)};   
        case 'UPDATE':
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}; 
        case 'LIKE':
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}; 
        case 'COMMENT': 
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}
        default:
            return state;
    }
}