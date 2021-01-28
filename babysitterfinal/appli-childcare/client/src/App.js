import React, {Component, Fragment, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from "./components/AppNavbar";
import { Container } from 'reactstrap';
import {loadUser} from './actions/authActions';
import setAuthToken from './reducers/utlils/setAuthToken';
import store from "./store";
import Accueil from "./components/Accueil";
import Dashboard from './components/Dashboard';
import Register from "./components/auth/Register";
import Alert from './components/pages/Alert';
import Login from "./components/auth/Login"; 
import PrivateRoute from './components/Routing/PrivateRoute';
import CreateProfile from './components/profile forms/CreateProfile';
import Profiles from './components/profiles/Profiles';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import EditProfile from './components/profile forms/EditProfile';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NounouMenzeh from './components/pages/NounouMenzeh';
import NounouAriana from './components/pages/NounouAriana';
import NounouMarsa from './components/pages/NounouMarsa';
import ParentMenzeh from './components/pages/ParentMenzeh';
import ParentAriana from './components/pages/ParentAriana';
import ParentMarsa from './components/pages/ParentMarsa';
import './App.css';


if(localStorage.token) {
  setAuthToken(localStorage.token);
}

function App () {
  
    useEffect(()=>{
      store.dispatch(loadUser());
    }, []);

  return (
    <Router>
  <Fragment>
  <AppNavbar />
    <Alert/>

    <Route exact path="/">
      <Container>
      <Accueil/>
      </Container>
    </Route>
    <Switch>

   <Route exact path="/register" >
    <Container>
    <Register/>
    </Container>
    </Route> 

     <Route exact path="/profiles" component={Profiles} />
     <Route exact path="/login" >
    <Container>
    <Login/>
    </Container>
    </Route> 

    <PrivateRoute exact path = '/dashboard' component={Dashboard}/>
    <PrivateRoute exact path = '/create-profile' component={CreateProfile}/>
    <PrivateRoute exact path = '/edit-profile' component={EditProfile}/>
    <PrivateRoute exact path = '/posts' component={Posts}/>
    <PrivateRoute exact path = '/posts/:id' component={Post}/>

    <Route path="/NM" component= {NounouMenzeh}/>
    <Route path="/PM" component= {ParentMenzeh}/>
    <Route path="/NMarsa" component= {NounouMarsa}/>
    <Route path="/PMarsa" component= {ParentMarsa}/>
    <Route path="/NA" component= {NounouAriana}/>
    <Route path="/PA" component= {ParentAriana}/>

    <Route path="/GEALL">
    <ParentAriana/>
    <ParentMarsa/>
    <ParentMenzeh/>
    </Route>

    <Route path="/NNALL">
    <NounouAriana/>
    <NounouMarsa/>
    <NounouMenzeh/>
    </Route>

    </Switch>
    </Fragment>
   </Router>
  );
};

export default App;
