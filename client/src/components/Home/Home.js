import React, { useEffect, useState } from 'react'
import Posts from '../Posts/Posts';
import Form from '../Form/Form'
import { useDispatch } from 'react-redux'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import Pagination from '../pagination/Pagination';
import { useHistory, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}



const Home = () => {

    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1 ;
    const searchQuery = query.get('searchQuery');
    const tagsQuery = query.get('tags');
    const [search, setSearch] = useState(searchQuery == 'none' ? '' : searchQuery);
    const [tags, setTags] = useState(tagsQuery?.length ? tagsQuery.split(',') : []);


    
    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            searchPost(e)
        }
    }

    const searchPost = (e) => {
        e.preventDefault();

        if(search?.trim() || tags.length > 0) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/')
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag!== tagToDelete));

    return (
    <div class="main-container row mt-5 justify-content-center">
        <div className="post col-lg-6 col-sm-12">
            <Posts setCurrentId={ setCurrentId } />
        </div>
        <div className="form col-lg-3 col-sm-12">
            <h2>Search</h2>
            <div className="my-4">
            <label  className="form-label">Search by title</label>
            <input type="text" className="form-control mb-2" name='search' value={search} onKeyDown={(e) => handleKeyPress(e)} onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPress} />
            </div>
            <div className="mb-3">
            <label  className="form-label">Search by tags</label>
            <ChipInput
                class='mb-4 myChipInput form-control'
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
            />
            </div>
            <button type="button" onClick={searchPost} className="btn btn-outline-primary mb-5">Search</button>
            <Form currentId={ currentId } setCurrentId={ setCurrentId } />
            <Pagination page={page} />
        </div>
    </div>
    )
}

export default Home
