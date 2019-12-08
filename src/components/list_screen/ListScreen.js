import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import trashcan from '../../images/trashcan.png'
import { Link } from 'react-router-dom';

import { Modal, Button, Icon } from 'react-materialize'

var theUser = ""
class ListScreen extends Component {
  state = {
    name: ''

  }

  handleChange = (event) => {
    const { target } = event;
    this.setState(state => ({
      ...state,
      [target.id]: target.value,
    }));
    const theWireFrame = this.props.location.state.theWireFrame

    const users = this.props.users
    for (var x in users) {
      if (users[x].id == this.props.auth.uid) {
        theUser = users[x]
      }
    }

    var copyList = ""

    copyList = theUser.wireFrameList.slice()

    for (var x = 0; x < copyList.length; x++) {
      if (copyList[x].key == theWireFrame.key) {
        copyList[x].name = target.value
      }
    }

    const fireStore = getFirestore();

    fireStore.collection('users').doc(this.props.auth.uid).update({
      wireFrameList: copyList
    })
  }

  render = () => {


    const auth = this.props.auth;

    if (!auth.uid) {
      return <Redirect to="/" />;
    }

    const theWireFrame = this.props.location.state.theWireFrame

    const users = this.props.users
    for (var x in users) {
      if (users[x].id == this.props.auth.uid) {
        theUser = users[x]
      }
    }

    var thisWireFrame = ""
    if (theUser.wireFrameList != undefined) {
      for (var x = 0; x < theUser.wireFrameList.length; x++) {
        if (theUser.wireFrameList[x].key == theWireFrame.key) {
          thisWireFrame = theUser.wireFrameList[x]

        }
      }
    }

    return (


      <div className="container white">

        <themodal />
        <div className="row nameRow">
          <div className="col s3">
            <i className="material-icons prefix ">account_circle</i>
            <label className="nameAndPassword">Wireframe Name:</label>
          </div>
          <div className="col s9">
            <input type="text" name="name" id="name" onChange={this.handleChange} value={thisWireFrame.name} />
          </div>
        </div>


        <div class="row">


          <div class="col s2">
            <div class="row">

              <div class="col s12 boxfield z-depth-1">
                <div class="row">
                  <div class="col s3">
                    <i class="material-icons">zoom_in</i>
                  </div>
                  <div class="col s3">
                    <i class="material-icons">zoom_out</i>
                  </div>
                  <div class="col s3">
                    <i class="material-icons">save</i>
                  </div>
                  <div class="col s3">
                    <i class="material-icons">cancel</i>
                  </div>

                </div>

              </div>
              <div class="col s12 boxfield z-depth-1 leftContainer">

                <div class="row">
                  <div class="col s12">
                    <a class="waves-effect waves-light light-green btn-small">Add Container</a>
                  </div>
                  <div class="col s12">
                    <label>Promp for Input</label>
                    <a class="waves-effect waves-light light-green btn-small">Add Label</a>
                  </div>
                  <div class="col s12">
                    <button type="button">Submit</button>
                    <a class="waves-effect waves-light light-green btn-small">Add Button</a>
                  </div>
                  <div class="col s12">
                    
                    <a class="waves-effect waves-light light-green btn-small">Add Textfield</a>
                  </div>

                </div>

              </div>

            </div>


          </div>
          <div class="col s8 boxfield z-depth-1">6-columns (one-half)</div>
          <div class="col s2  boxfield z-depth-1 rightbox rightContainer">
            <h6>Properties: <input className="textboxy" id="itemdescriptiontext" type="text" name="descriptionValue" /></h6>
            <h6>Font Size: <input className="textboxy" id="itemdescriptiontext" type="text" name="descriptionValue" /></h6>
            <h6>Background: <input className="textboxy" id="itemdescriptiontext" type="text" name="descriptionValue" /></h6>
            <h6>Border Color: <input className="textboxy" id="itemdescriptiontext" type="text" name="descriptionValue" /></h6>
            <h6>Border Thickness: <input className="textboxy" id="itemdescriptiontext" type="text" name="descriptionValue" /></h6>
            <h6>Border Radius: <input className="textboxy" id="itemdescriptiontext" type="text" name="descriptionValue" /></h6>

          </div>
        </div>
        {/* <ItemsList todoList={todoList} /> */}
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
)(ListScreen);