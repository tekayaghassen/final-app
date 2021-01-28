import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../actions/authActions';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import PropTypes from 'prop-types';
import Logout from "./auth/Logout";

class AppNavbar extends Component {
 state ={
   isOpen: false
 };

 static propTypes = {
   auth: PropTypes.object.isRequired
 }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
     render(){
       const { isAuthenticated, user } = this.props.auth;
       
       const authLinks = (
         <Fragment>
          <NavItem>
            <span className="navbar-text mr-3">
              <strong> { user ? `Welcome ${user.name}`:""} </strong>
            </span>
          </NavItem>

           <NavLink>
             <Link to='/profiles'>Profiles</Link>
           </NavLink>
           <NavLink>
             <Link to='/posts'>Posts</Link>
           </NavLink>
           <NavLink>
             <Link to='/dashboard'>Dashboard</Link>
           </NavLink>
           <NavItem>
             <Logout/>
           </NavItem>
         </Fragment>
       );

       const guestLinks = (
            <Fragment>
           
           <NavItem>
             <Link to='/profiles'>Profiles</Link>
           </NavItem>
           {/* <NavItem>
             <Link className='register' to='/posts'>Posts</Link>
           </NavItem> */}
            <NavItem>
             <Link className='register' to='/register'>Register</Link> 
            </NavItem>
            <NavItem>
            <Link to='/login'>Login</Link> 
            </NavItem>
            </Fragment>
       );

       return (
    <div>
      <Navbar color="light" light expand="md" className="mb-5">
        <Container>
          <NavbarBrand href="/">ChildCare</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
       )}};

AppNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logout} /* null */)(AppNavbar);
