import React, { Fragment, useState } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/authActions';
import PropTypes from 'prop-types';
/* import axios from 'axios'; */

const Register = ({setAlert, register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        address: '',
        email: '',
        password: ''
    });

const {name, role, address, email, password} = formData;

const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

const onSubmit = async e => {
    e.preventDefault();
    register ({name, role, address, email, password});

    /* const newUser = {
        name,
        role,
        address,
        email,
        password
    }

    try {
        const config = {
            headers: {
                'Content-Type': 'Application/json'
            }
        }

        const body = JSON.stringify(newUser);

        const res = await axios.post('/api/users', body, config);
        console.log(res.data);
    } catch(err) {
        console.error(err.response.data);
    }*/
}; 
if (isAuthenticated){return <Redirect to='/dashboard'/>}
    return (
    <Fragment className='register'>
 <h1 className="large text-primary" > Sign up </h1>
 <p className='lead'><i className='fas fa-user'></i> Create your account   </p>
 <form className='form' onSubmit={e => onSubmit(e)}>
 <div className='form-group'>
    <input type='text' placeholder='Name' name='name' value = {name} 
    onChange={e => onChange(e)} required/>
 </div>
 <div className='form-group'>
    <input type='text' placeholder='Parent/Nounou' name='role' value = {role} 
    onChange={e => onChange(e)} required/>
 </div>
 <div className='form-group'>
    <input type='text' placeholder='Address' name='address' value = {address} 
    onChange={e => onChange(e)} required/>
 </div>
 <div className='form-group'>
 <input type='email' placeholder='Email address' name='email' value = {email} 
    onChange={e => onChange(e)} required/>
 <small className='form-text'>
This site uses Gravatar
 </small>
 </div>
 <div className='form-group'>
    <input type='password' placeholder='Password' name='password' 
    value = {password} onChange={e => onChange(e)} minLength='6' required/>
 </div>

 
<input type='submit' className='btn btn-primary' value='Register'/>

</form>

<p className='my-1'>Already have an account ? <Link to='/login'>Sign In </Link> </p>
    
</Fragment>
   
    )};

    Register.propTypes = {
        setAlert: PropTypes.func.isRequired,
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    const mapStateToprops = state => ({
        isAuthenticated: state.auth.isAuthenticated
    });

export default connect(mapStateToprops, {setAlert, register})(Register);