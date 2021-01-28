import React, {useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DashboardActions from '../components/DashboardActions';
import {getCurrentProfile, deleteAccount} from '../actions/profile';

const Dashboard = ({getCurrentProfile, deleteAccount, auth: {user}, profile: {profile}}) => {
    useEffect(()=>{
        getCurrentProfile()}, [getCurrentProfile]);
    
    return (
    <div className='dash'>
       <h1 className='large text-primary'>Dashboard</h1>
       <p>Welcome {user && user.name}</p>
       {profile !== null ? (
       <Fragment>
           <DashboardActions/>
        <div className='my-2'>
        <button className='btn btn-danger' onClick={()=>deleteAccount()}>
        Delete my account
        </button>

        </div>
       </Fragment>):(
       <Fragment><p>You don't have a profile</p>
       <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
       </Fragment>)}
    </div>
    )};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired ,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})


export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);