import React, {useState, Fragment, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { createProfile, getCurrentProfile} from '../../actions/profile';


const EditProfile = ({profile:{profile, loading}, createProfile, getCurrentProfile, history}) => {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        address: '',
        email:''
    });

useEffect(()=>{
    getCurrentProfile();

    setFormData({
        name: loading || !profile.name ? '' : profile.name,
        role: loading || !profile.role ? '' : profile.role,
        address: loading || !profile.address ? '' : profile.address,
        email: loading || !profile.email ? '' : profile.email,
    })
}, [loading, getCurrentProfile])

    const {
    name,
    role,
    address,
    email
    } = formData;

   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
      
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    }

    return (
        <div className='dash'>
              <h1 className="large text-primary">Create Your Profile</h1>
              <p className="lead">
                Let's get some information to make your profile stand out
              </p>
              <form className='form' onSubmit={e => onSubmit(e)}>
              <div className='form-group'>
                <input type='text' placeholder='Name' name='name' value={name}
                onChange={e=>onChange(e)} />
               </div>
              <div className='form-group'>
                <input type='text' placeholder='Parent or Nounou' name='role' 
                value={role} onChange={e=>onChange(e)}/>
               </div>
              <div className='form-group'>
                <input type='text' placeholder='Address' name='address' 
                value={address} onChange={e=>onChange(e)}/>
                <small className='form-text'>
                example: Menzeh 9, Tunis
                </small>
               </div>
              <div className='form-group'>
                <input type='email' placeholder='email' name='email' value={email}
                onChange={e=>onChange(e)}/>
                <small className='form-text'>
                We will not share your email
                </small>
               </div>
                <input
                  type="submit"
                  className="btn btn-primary my-1"
                  value='Submit'
                />
                <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
              </form>
        </div>
    )
}

EditProfile.propTypes = {
 createProfile: PropTypes.func.isRequired,
 getCurrentProfile: PropTypes.func.isRequired,
 profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile}) (withRouter(EditProfile));