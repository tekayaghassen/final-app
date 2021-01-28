import React, {useState, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile} from '../../actions/profile';


const CreateProfile = ({createProfile, history}) => {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        address: '',
        email:''
    });

    const {
    name,
    role,
    address,
    email
    } = formData;

   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
      
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
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
                <Link clLinkssNLinkme="btn btn-light my-1" to='/dashboard'>Go Back</Link>
              </form>
        </div>
    )
}

CreateProfile.propTypes = {
 createProfile: PropTypes.func.isRequired
};



export default connect(null, {createProfile}) (withRouter(CreateProfile));