import React, { useEffect } from 'react'
import { Link } from 'react-router-dom' 
import { Pagination, PaginationItem } from '@material-ui/lab'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../actions/posts'


const Paginate = ({ page }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { numberOfPages } = useSelector((state) => state.posts);
    const state = useSelector((state) => state);

    console.log(state);
    

    console.log(numberOfPages);
    
    

    useEffect(() => {

        if(page) {
            
            console.log("Inside use exxect in Pagination");
            
            dispatch(getPosts(page));
        } 
    }, [page]);

    return (
        <Pagination 
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem { ...item } component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
}

export default Paginate;


