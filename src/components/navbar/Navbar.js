import React , { Component }from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';
import { Route } from 'react-router-dom'
let theUser = ""

class Navbar extends React.Component {

 


  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <LoggedInLinks profile={profile} /> : <LoggedOutLinks />;
    const users = this.props.users
    for (var x in users) {

        if (users[x].id == this.props.auth.uid) {
            theUser = users[x]
        }
    }
    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to="/" className="brand-logo">Wireframe!</Link>
          {links}
          <Route render={({ history}) => (<button className={ theUser.admin == "yes"?"gotodatabase":"hidegotodatabase"}  onClick={() => { history.push('/databaseTester') }}>Database</button>   )} />
        </div>
      </nav>
    );
  };
}

const mapStateToProps = state => ({
  users: state.firestore.ordered.users,
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(Navbar);