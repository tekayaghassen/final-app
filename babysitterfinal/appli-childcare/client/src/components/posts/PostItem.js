import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {addLike, removeLike, deletePost} from '../../actions/post';

const PostItem = ({ 
    addLike, removeLike, deletePost, auth, 
    post: {_id, description, name, comments, avatar, likes, user },
    showActions
    }) => (
<div className='profile bg-white p-1 my-1'>
<div> 
<a href='/profile'>
<img class='round-img' src={avatar}/>
<h4>{name}</h4>
</a>
</div> 
<div>
<p class='my-1'>
{description}
</p>
<p>
Posted on <Moment>{Date.now()}</Moment> 
</p>
{showActions && <Fragment>
<button onClick={e=>addLike(_id)} type='button' className='btn btn-light'>
<i class='fas fa-thumbs-up'/> 
<span>{likes.length > 0 && (
<span>{likes.length}</span>)}</span> 
</button> {' '}
<button onClick={e=>removeLike(_id)}  type='button' className='btn btn-light'>
<i class='fas fa-thumbs-down'/>
</button>
<Link to={`/posts/${_id}`} className='btn btn-primary'>
Discussion {comments.length > 0 && (<span className='comment-count'>{comments.length}</span>)}
</Link>
{!auth.loading && user === auth.user._id && (<button onClick={e => deletePost(_id)}
type='button' className='btn btn-danger'>
<i class='fas fa-times'/>
</button>)}

</Fragment>}

</div>
</div>
    )

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, 
{addLike, removeLike, deletePost})(PostItem)