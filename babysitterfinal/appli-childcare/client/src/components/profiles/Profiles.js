import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import ProfileItem from './ProfileItem';
import {connect} from 'react-redux';
import {getProfiles} from '../../actions/profile';

const Profiles = ({getProfiles, profile: {profiles, loading}}) => {
    useEffect(()=>{
        getProfiles();
    }, [getProfiles])
    return (
    <div className='dash'>
<h1 className='large text-primary'>Profiles</h1>
<p className='lead'>Browse and connect with profiles</p>
<div className='profiles'>
{profiles.length>0 ? (
    profiles.map(profile=>(<ProfileItem key={profile._id} profile={profile}/>))
) : <h4>No profiles found ...</h4>}
</div>
    </div>
    )}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles);