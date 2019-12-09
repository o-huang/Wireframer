import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';

import { Modal, Button, Icon } from 'react-materialize'
import Draggable from 'react-draggable';

var theUser = ""
class ListScreen extends Component {
  state = {
    name: '',


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
    console.log("!!!!!1")
    console.log(thisWireFrame)
    console.log(theWireFrame)
    console.log("!!!!!")
    var wireFrameItems = thisWireFrame.list
    return (



      <div className="container white">
        {/* Row for the name */}

        <div className="row nameRow">
          <div className="col s3">
            <i className="material-icons prefix ">account_circle</i>
            <label className="nameAndPassword">Wireframe Name:</label>
          </div>
          <div className="col s9">
            <input type="text" name="name" id="name" onChange={this.handleChange} value={thisWireFrame.name} />
          </div>
        </div>

        {/* Row for item container divided into 3 */}
        <div className="row">

          <div className="col s2">

            {/* Left Side*/}
            <div className="row">

              {/* Icon Section*/}
              <div className="col s12 boxfield z-depth-1">
                <div className="row">
                  <div className="col s3">
                    <i className="material-icons">zoom_in</i>
                  </div>
                  <div className="col s3">
                    <i className="material-icons">zoom_out</i>
                  </div>
                  <div className="col s3">
                    <i className="material-icons">save</i>
                  </div>
                  <div className="col s3">
                    <Link to="/"><i className="material-icons">cancel</i></Link>
                  </div>
                </div>
              </div>
              {/* Icon Section*/}

              {/* Item Section*/}
              <div className="col s12 boxfield z-depth-1 leftContainer">
                <div className="row">
                  <div className="col s12" id="boxPadding">
                    <div id="flex">
                      <div className="propContainer"></div>
                    </div>
                    <a className="waves-effect waves-light light-green btn-small" id="flex">Add Container</a>
                  </div>
                  <div className="col s12" id="boxPadding">
                    <div id="flex">
                      <label >Promp for Input:</label>
                    </div>
                    <a className="waves-effect waves-light light-green btn-small" id="flex">Add Label</a>
                  </div>
                  <div className="col s12" id="boxPadding">
                    <div id="flex">
                      <button type="button" >Submit</button>
                    </div>
                    <a className="waves-effect waves-light light-green btn-small" id="flex">Add Button</a>
                  </div>
                  <div className="col s12" id="boxPadding">
                    <div id="flex">
                      <input type="text" placeholder="input"  />
                    </div>
                    <a className="waves-effect waves-light light-green btn-small" id="flex">Add Textfield</a>
                  </div>
                </div>
              </div>

            </div>
          </div>


          <div className="col s8" >
            <div className="box" style={{ height: '550px', width: '832px', position: 'relative', overflow: 'auto', padding: '0' }}>
              <div style={{ height: '550px', width: '832px', padding: '10px' }}>


                {wireFrameItems && wireFrameItems.map(wireframe => (
               
                      <ItemsList wireFrameItem={wireframe} />
                 
                ))}
              </div>
            </div>


          </div>


          <div className="col s2  boxfield z-depth-1 rightbox rightContainer">
            <h6>Properties: <input className="textboxy" type="text" /></h6>
            <h6>Font Size: <input className="textboxy" type="text" /></h6>
            <h6>Background: <input className="textboxy" type="text" /></h6>
            <h6>Border Color: <input className="textboxy" type="text" /></h6>
            <h6>Border Thickness: <input className="textboxy" type="text" /></h6>
            <h6>Border Radius: <input className="textboxy" type="text" /></h6>
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
)(ListScreen);