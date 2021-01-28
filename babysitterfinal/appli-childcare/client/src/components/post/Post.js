import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getPost} from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';

const Post = ({getPost, post: {post, loading}, match}) => {
    useEffect(()=>{
        getPost(match.params.id);
    }, [getPost]);

    return ( loading || post === null ? <h1>Loading... </h1> :
        <div className='dash'>
            <Link to='/posts' className='btnn'>
            Back to posts
            </Link>
         
             <PostItem post={post} showActions={false}/>
             <br/>
           <CommentForm postId={post._id} />
            <div>
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment}
                    postId={post._id} />
                ))}
            </div> 
        </div>
    )
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getPost})(Post)