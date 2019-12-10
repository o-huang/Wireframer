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
var zoomDefaultSize = 1
class ListScreen extends Component {
  state = {
    name: '',
    theUser: this.props.location.state.theUser,
    theWireFrame: this.props.location.state.theWireFrame
  }

  handleChange = (event) => {
    const { target } = event;
    this.setState(state => ({
      ...state,
      [target.id]: target.value,
    }));

    var copyList = ""
    copyList = this.state.theUser.wireFrameList

    for (var x = 0; x < copyList.length; x++) {
      if (copyList[x].key == this.state.theWireFrame.key) {
        copyList[x].name = target.value
      }
    }

    const fireStore = getFirestore();
    fireStore.collection('users').doc(this.props.auth.uid).update({
      wireFrameList: copyList
    })
  }

  findBiggestKey = (copy) => {
    var biggestKey = -1
    for (var x = 0; x < copy.list.length; x++) {
      if (copy.list[x].key > biggestKey) {
        biggestKey = copy.list[x].key
      }
    }
    biggestKey += 1
    return biggestKey
  }

  addContainer = () => {
    var copy = Object.assign({}, this.state.theWireFrame)
    var newContainer = {
      key: this.findBiggestKey(copy),
      type: "container",
      background: "white",
      bordercolor: "black",
      borderthickness: "1px",
      borderradius: "1px"
    }
    copy.list.push(newContainer)
    this.setState({ theWireFrame: copy })
  }

  addLabel = () => {
    var copy = Object.assign({}, this.state.theWireFrame)
    var newLabel = {
      key: this.findBiggestKey(copy),
      type: "label",
      text: "Prompt for Input",
      fontsize: "20px",
      background: "white",
      bordercolor: "black",
      borderthickness: "1px",
      borderradius: "1px"
    }
    copy.list.push(newLabel)
    this.setState({ theWireFrame: copy })
  }

  addButton = () => {
    var copy = Object.assign({}, this.state.theWireFrame)
    var newButton = {
      key: this.findBiggestKey(copy),
      type: "button",
      text: "Submit",
      fontsize: "20px",
      background: "white",
      bordercolor: "black",
      borderthickness: "1px",
      borderradius: "1px"
    }
    copy.list.push(newButton)
    this.setState({ theWireFrame: copy })

  }

  addTextfield = () => {
    var copy = Object.assign({}, this.state.theWireFrame)
    var newTextfield = {
      key: this.findBiggestKey(copy),
      type: "textfield",
      text: "",
      fontsize: "20px",
      background: "white",
      bordercolor: "black",
      borderthickness: "1px",
      borderradius: "1px",
    }
    copy.list.push(newTextfield)
    this.setState({ theWireFrame: copy })
  }

  zoomIn = () => {
    var cols = document.getElementsByClassName("zoom")
    for (var i = 0; i < cols.length; i++) {
      if (cols[i].style.transform == "") {
        cols[i].style.transform = "scale(1.2)"
      }
      else {
        var firstPar = cols[i].style.transform.indexOf("(")
        var secondPar = cols[i].style.transform.indexOf(")")
        firstPar += 1
        var theNumber = cols[i].style.transform.substring(firstPar, secondPar)
        var theNumber = parseFloat(theNumber)
        if (theNumber + .2 < 10) {
          theNumber = theNumber + .2
          var theString = "scale("+theNumber+")"
          cols[i].style.transform= theString
        }
      }
    }
  }

  zoomOut = () => {
    var cols = document.getElementsByClassName("zoom")
    for (var i = 0; i < cols.length; i++) {
      if (cols[i].style.transform == "") {
        cols[i].style.transform = "scale(.8)"
      }
      else {
        var firstPar = cols[i].style.transform.indexOf("(")
        var secondPar = cols[i].style.transform.indexOf(")")
        firstPar += 1
        var theNumber = cols[i].style.transform.substring(firstPar, secondPar)
        var theNumber = parseFloat(theNumber)
        if (theNumber - .2 >.2) {
          theNumber = theNumber - .2
          var theString = "scale("+theNumber+")"
          cols[i].style.transform= theString
        }
      }
    }
  }


  render = () => {
    const auth = this.props.auth;

    if (!auth.uid) {
      return <Redirect to="/" />;
    }

    var wireFrameItems = this.state.theWireFrame.list

    return (



      <div className="container white">
        {/* Row for the name */}

        <div className="row nameRow">
          <div className="col s3">
            <i className="material-icons prefix ">account_circle</i>
            <label className="nameAndPassword">Wireframe Name:</label>
          </div>
          <div className="col s9">
            <input type="text" name="name" id="name" onChange={this.handleChange} value={this.state.theWireFrame.name} />
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
                    <i className="material-icons" onClick={this.zoomIn}>zoom_in</i>
                  </div>
                  <div className="col s3">
                    <i className="material-icons" onClick={this.zoomOut}>zoom_out</i>
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
                    <a className="waves-effect waves-light light-green btn-small" id="flex" onClick={this.addContainer}>Add Container</a>
                  </div>
                  <div className="col s12" id="boxPadding">
                    <div id="flex">
                      <label >Promp for Input:</label>
                    </div>
                    <a className="waves-effect waves-light light-green btn-small" id="flex" onClick={this.addLabel}>Add Label</a>
                  </div>
                  <div className="col s12" id="boxPadding">
                    <div id="flex">
                      <button type="button" >Submit</button>
                    </div>
                    <a className="waves-effect waves-light light-green btn-small" id="flex" onClick={this.addButton}>Add Button</a>
                  </div>
                  <div className="col s12" id="boxPadding">
                    <div id="flex">
                      <input type="text" className="browser-default" placeholder="input" id="inputTextBox" />
                    </div>
                    <a className="waves-effect waves-light light-green btn-small" id="flex" onClick={this.addTextfield}>Add Textfield</a>
                  </div>
                </div>
              </div>

            </div>
          </div>


          <div className="col s8" >
            <div className="box" style={{ height: '550px', width: '832px', position: 'relative', overflow: 'auto', padding: '0' }}>
              <div className="boundThis" style={{ height: '2000px', width: '2000px', padding: '10px' }}>
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