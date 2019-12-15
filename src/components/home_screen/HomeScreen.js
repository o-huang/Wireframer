import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';
import { Route } from 'react-router-dom'
const location = {
    pathname: '/somewhere',
    state: { fromDashboard: true }
}
var theUser = ""
class HomeScreen extends Component {

    handleNewList = (theUser) => {

        const fireStore = getFirestore();
        var currentdate = new Date() + ""

        var biggestkey = -1
        var theWireFrameList = theUser.wireFrameList
        for (var x in theWireFrameList) {

            if (theWireFrameList[x].key > biggestkey) {
                biggestkey = theWireFrameList[x].key
            }
        }
        biggestkey += 1

        var newWireFrame = { key: biggestkey, lastUpdate: currentdate, list: [], name: "Unnamed" }

        theWireFrameList.push(newWireFrame)

        fireStore.collection('users').doc(this.props.auth.uid).update({
            wireFrameList: theWireFrameList
        })

        const users = this.props.users
        for (var x in users) {
            if (users[x].id == this.props.auth.uid) {
                theUser = users[x]
            }
        }
        var copyUser =""
        copyUser = Object.assign({},theUser)
        this.props.history.push({
            pathname: "/wireframe/" + newWireFrame.key,
            state:{
                theWireFrame: newWireFrame,
                theUser: copyUser
            }

        })
    }

    render() {

        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        const users = this.props.users
        for (var x in users) {

            if (users[x].id == this.props.auth.uid) {
                theUser = users[x]
            }
        }


        return (
            <div className="dashboard container">
                <Route render={({ history}) => (<button id="databasebutton" className={ theUser.admin == "yes"?"gotodatabase":"hidegotodatabase"}  onClick={() => { history.push('/databaseTester') }}>Database</button>   )} />
                <div className="row">
                    <div className="col s12 m4" id="theLists">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            Wireframer
                        </div>

                        <div className="home_new_list_container">
                            <button className="home_new_list_button" onClick={this.handleNewList.bind(this, theUser)}>
                                Create a New Wireframe
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
        auth: state.firebase.auth,

    };
};


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'users' },
    ]),
)(HomeScreen);
