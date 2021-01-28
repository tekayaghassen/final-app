import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {deleteComment} from '../../actions/post';

const CommentItem = ({
    postId,
    comment: { _id, description, name, avatar, user },
    auth,
    deleteComment
}) => {
    return (
        <div className='profile'>
            <img className='round-img' src={avatar} />
            <h4>{name}</h4>
            <p>{description} </p>
            <p>Posted on <Moment>{Date.now()}</Moment> </p>
            {!auth.loading && user === auth.user._id && (
                <button 
                onClick={e=> deleteComment(postId, _id)}
                type="button"
                className='btn btn-danger'
                >
                <i className='fas fa-times'></i>
                </button>
            )}
        </div>
    )
}

CommentItem.propTypes = {
postId: PropTypes.number.isRequired,
comment: PropTypes.object.isRequired,
auth: PropTypes.object.isRequired,
deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteComment})(CommentItem)