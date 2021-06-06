
//this reducer will contain all action on posts which is get, create etc.
//in another file we have specified the actions for getting the posts and creating the post
//we use switch instead of if
//we will use this function inside combineReducers function in index.js file. it will be one of the reducers

export default (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload];
        default:
            return posts;
    }
}