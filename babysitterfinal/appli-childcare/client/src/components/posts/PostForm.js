import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addPost} from '../../actions/post';

const PostForm = ({addPost}) => {
    const [description, setDescription] = useState('');

    return (
        <div>
        <div> 
        <h3>Add your post ...</h3>
        </div>
        <form
        className='form my-1'
        onSubmit={e=>{
            e.preventDefault();
            addPost({description});
            setDescription('');
        }}
        >
        
        <textarea
        name='description'
        cols='30'
        rows='5'
        placeholder='Create a post'
        value={description}
        onChange={e=>setDescription(e.target.value)}
        required
        >
        </textarea>
        <br/>
        <input type='submit' className='btn btn-dark my-1' value='submit' />
        </form>
        </div>
    )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
}

export default connect(null, {addPost})(PostForm)