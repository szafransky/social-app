import * as api from '../api'

export const signin = (formData, history) =>  async (dispatch) => {

    try {
        //login the user
        dispatch({ type: 'START_LOADING' });
        const response = await api.signIn(formData);
        console.log(response);
        dispatch({ type: 'AUTH', data: response.data});
        dispatch({ type: 'END_LOADING' });
        history.push('/');
    } catch (error) {
       console.log(error.response.data)
       
        
        dispatch({ type: 'AUTH', data: error.response.data});
        
    }
}

export const signup = (formData, history) =>  async (dispatch) => {

    try {
         //signup the user
         dispatch({ type: 'START_LOADING' });
         const { data } = await api.signUp(formData);

        console.log(data);
        

        dispatch({ type: 'AUTH', data});


        dispatch({ type: 'END_LOADING' });
         history.push('/');
    } catch (error) {
        dispatch({ type: 'AUTH', data: error.response.data});
        
    }
}


export const getUser = (id) => async(dispatch) => {

    try {
        dispatch({ type: 'START_LOADING' });
        console.log(id);
        const { data } = await api.fetchUser(id);

        console.log(data);
        dispatch({ type: 'GET_USER', data });
        dispatch({ type: 'END_LOADING' });
        
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = (id, updatedUser) => async(dispatch) => {

    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.updateUser(id, updatedUser);

        // dispatch({ type: 'UPDATE_USER', data });
        dispatch({ type: 'END_LOADING' });
        
    } catch (error) {
        console.log(error);
    }
}
export const getUsers = () => async (dispatch) => {

    try {
        dispatch({ type: 'START_LOADING' });
        const { data } = await api.fetchUsers();
        console.log(data);
        
        dispatch({ type: 'FETCH_ALL_USERS', data });

        dispatch({ type: 'END_LOADING' });
    } catch (error) {
        console.log(error);
    }
}
