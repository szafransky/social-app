

const authReducer = ( state = { authData: null, users: [] }, action) => {
    switch (action.type) {
        case 'AUTH':
            console.log(action?.data);
            console.log(action);
            if(action?.data?.result) {
                localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            }
            return { ...state, authData: action?.data };
        case 'FETCH_ALL_USERS': 
            return { ...state, users: action?.data };
        case 'START_LOADING':
            return { ...state, isLoading: true }
        case 'END_LOADING':
            return { ...state, isLoading: false }
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, authData: null };
        case 'GET_USER': 
            console.log('Inside get user');
            console.log(action?.data);
            return { ...state, showUser: action?.data };
       
        default:
            return state;
    }
}


export default authReducer;