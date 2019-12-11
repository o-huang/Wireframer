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

  constructor(props) {
    super(props)
    this.buttonPress = this.buttonPress.bind(this);
  }

  state = {
    name: '',
    theUser: this.props.location.state.theUser,
    theWireFrame: this.props.location.state.theWireFrame,
    didISave: false,
    //-------------------------------------------------------------
    properties: "",
    fontsize: "",
    fontcolor: "",
    background: "",
    bordercolor: "",
    borderthickness: "",
    borderradius: "",
    //-------------------------------------------------------------
    selectedItem: ""
  }

  buttonPress = (event) => {

    if (event.keyCode === 46) {
      event.preventDefault()
      var copyList = Object.assign({}, this.state.theWireFrame)
      var index = copyList.list.indexOf(this.state.selectedItem)
      console.log(this.state.selectedItem.p)
      if (index != -1) {
        copyList.list.splice(index, 1)
        this.setState({ theWireFrame: copyList })
        this.setState({ selectedItem: "" })
      }
    }

    if (event.ctrlKey && event.keyCode === 68) {
      event.preventDefault()
      console.log("copying")
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.buttonPress, false);

  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.buttonPress, false);

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
      background: "#FFFFFF",
      bordercolor: "#000000",
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
      fontcolor: "#000000",
      background: "#FFFFFF",
      bordercolor: "#000000",
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
      fontcolor: "#000000",
      background: "#FFFFFF",
      bordercolor: "#000000",
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
      fontcolor: "#000000",
      background: "#FFFFFF",
      bordercolor: "#000000",
      borderthickness: "1px",
      borderradius: "1px",
    }
    copy.list.push(newTextfield)
    this.setState({ theWireFrame: copy })
  }

  nth_occurrence(string, char, nth) {
    var first_index = string.indexOf(char);
    var length_up_to_first_index = first_index + 1;

    if (nth == 1) {
      return first_index;
    } else {
      var string_after_first_occurrence = string.slice(length_up_to_first_index);
      var next_occurrence = this.nth_occurrence(string_after_first_occurrence, char, nth - 1);

      if (next_occurrence === -1) {
        return -1;
      } else {
        return length_up_to_first_index + next_occurrence;
      }
    }
  }

  zoomIn = () => {
    var cols = document.getElementsByClassName("zoom")

    for (var i = 0; i < cols.length; i++) {
      if (cols[i].style.transform == "") {
        cols[i].style.transform = "scale(2)"
      }
      else {
        var firstPar = cols[i].style.transform.indexOf("(")
        var secondPar = cols[i].style.transform.indexOf(")")
        firstPar += 1
        var theNumber = cols[i].style.transform.substring(firstPar, secondPar)
        var theNumber = parseFloat(theNumber)
        if (theNumber * 2 < 10) {
          theNumber = theNumber * 2
          var theString = "scale(" + theNumber + ")"
          cols[i].style.transform = theString
        }
      }
    }
  }

  zoomOut = () => {
    var cols = document.getElementsByClassName("zoom")
    for (var i = 0; i < cols.length; i++) {
      if (cols[i].style.transform == "") {
        cols[i].style.transform = "scale(.5)"
      }
      else {
        var firstPar = this.nth_occurrence(cols[i].style.transform, "(", 2)
        if (firstPar == -1) {
          cols[i].style.transform += " scale(.5) !important"
        } else {
          var secondPar = this.nth_occurrence(cols[i].style.transform, ")", 2)
          firstPar += 1
          var theNumber = cols[i].style.transform.substring(firstPar, secondPar)
          var theNumber = parseFloat(theNumber)
          if (theNumber / 2 > .2) {
            theNumber = theNumber / 2

            cols[i].style.transform = cols[i].style.transform.replace(/scale\([0-9|\.]*\)/, 'scale(' + theNumber + ')');

          }

        }

      }
    }
  }

  checkSaved = () => {
    if (this.state.didISave == false) {
      if (window.confirm("Do you want to save first?")) {

      } else {
        this.props.history.push({
          pathname: "/",
        })
      }
    } else {
      this.props.history.push({
        pathname: "/",
      })
    }
  }

  changeItem = (event) => {
    if (this.state.selectedItem != "") {
      this.setState({
        [event.target.name]: event.target.value
      })

      this.state.selectedItem.text = document.getElementById("theProperties").value
      this.state.selectedItem.fontsize = document.getElementById("theFontsize").value + "px"
      this.state.selectedItem.fontcolor = document.getElementById("theFontcolor").value
      this.state.selectedItem.background = document.getElementById("theBackground").value
      this.state.selectedItem.bordercolor = document.getElementById("theBordercolor").value
      this.state.selectedItem.borderthickness = document.getElementById("theBorderthickness").value + "px"
      this.state.selectedItem.borderradius = document.getElementById("theBorderradius").value + "px"
    }
  }

  setSelectedItem = (event, currentItemSelected) => {
    console.log(currentItemSelected)
    event.stopPropagation()
    this.setState({ selectedItem: currentItemSelected })

    if (currentItemSelected.type == "container") {
      this.setState({ properties: "" })
      this.setState({ fontsize: "" })
      this.setState({ fontcolor: "" })
    } else {
      this.setState({ properties: currentItemSelected.text })
      this.setState({ fontsize: parseInt(currentItemSelected.fontsize) })
      this.setState({ fontcolor: currentItemSelected.fontcolor })
    }

    this.setState({ background: currentItemSelected.background })
    this.setState({ bordercolor: currentItemSelected.bordercolor })
    this.setState({ borderthickness: parseInt(currentItemSelected.borderthickness) })
    this.setState({ borderradius: parseInt(currentItemSelected.borderradius) })
  }

  setItemSelectedEmpty = () => {
    this.setState({ selectedItem: "" })
    this.setState({ properties: "" })
    this.setState({ fontsize: "" })
    this.setState({ fontcolor: "" })
    this.setState({ background: "" })
    this.setState({ bordercolor: "" })
    this.setState({ borderthickness: "" })
    this.setState({ borderradius: "" })
  }


  render = () => {
    const auth = this.props.auth;

    if (!auth.uid) {
      return <Redirect to="/" />;
    }

    var wireFrameItems = this.state.theWireFrame.list
    const properties = this.state.properties
    const fontsize = this.state.fontsize
    const background = this.state.background
    const bordercolor = this.state.bordercolor
    const borderthickness = this.state.borderthickness
    const borderradius = this.state.borderradius
    const fontcolor = this.state.fontcolor
    return (



      <div className="container white" onKeyDown={this.handleKeyDown}>
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

                    <i className="material-icons" onClick={this.checkSaved}>cancel</i>
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
              <div className="boundThis" style={{ height: '1000px', width: '1000px', padding: '10px', overflow: "auto" }} onClick={this.setItemSelectedEmpty}>
                {wireFrameItems && wireFrameItems.map(wireframe => (
                  <ItemsList wireFrameItem={wireframe} setSelectedItem={this.setSelectedItem.bind(this)} />
                ))}
              </div>
            </div>
          </div>


          <div className="col s2  boxfield z-depth-1 rightbox rightContainer">
            <h6>Properties: <input className="textboxy" type="text" id="theProperties" name="properties" value={properties} onChange={this.changeItem} /></h6>
            <h6>Font Size: <input className="textboxy" type="text" id="theFontsize" name="fontsize" value={fontsize} onChange={this.changeItem} /></h6>
            <h6>Font Color: <input className="textboxy" type="color" id="theFontcolor" name="fontcolor" value={fontcolor} onChange={this.changeItem} /></h6>
            <h6>Background: <input className="textboxy" type="color" id="theBackground" name="background" value={background} onChange={this.changeItem} /></h6>
            <h6>Border Color: <input className="textboxy" type="color" id="theBordercolor" name="bordercolor" value={bordercolor} onChange={this.changeItem} /></h6>
            <h6>Border Thickness: <input className="textboxy" type="text" id="theBorderthickness" name="borderthickness" value={borderthickness} onChange={this.changeItem} /></h6>
            <h6>Border Radius: <input className="textboxy" type="text" id="theBorderradius" name="borderradius" value={borderradius} onChange={this.changeItem} /></h6>
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