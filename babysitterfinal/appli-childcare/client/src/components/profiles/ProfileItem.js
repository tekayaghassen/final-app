import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({ profile: {
    user: {_id, avatar},
    name,
    role,
    address,
    email
}}) => {
    return (
        <div className='profile bg-light'>
        <img src={avatar} className='round-img' />
            <div>
            <h2>{name}</h2>
            <p>{role}</p>
            <p>{address}</p>
            <p>{email}</p>
            {/* <Link to={`/profile/${_id}`}>Vien Profile</Link> */}
            </div>
        </div>
           
    )
}

ProfileItem.propTypes = {
profile: PropTypes.object.isRequired
}

export default ProfileItem;