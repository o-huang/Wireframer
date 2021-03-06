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
import { classPrivateMethod } from '@babel/types';

var theUser = ""
var listy=""
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
    name: this.props.location.state.theWireFrame.name,
    properties: "",
    fontsize: "",
    fontcolor: "",
    background: "",
    bordercolor: "",
    borderthickness: "",
    borderradius: "",
    width: 2000,
    height: 2000,
    //-------------------------------------------------------------
    selectedItem: "",
    scaleNumber: 1,

  }

  buttonPress = (event) => {

    if (event.keyCode === 46) {
      event.preventDefault()

      var copyList = Object.assign({}, this.state.theWireFrame)
      var index = copyList.list.indexOf(this.state.selectedItem)
      if (index != -1) {
        copyList.list.splice(index, 1)
        this.setState({ theWireFrame: copyList })
        this.setState({ selectedItem: "" })
        this.setState({didISave: false})
      }
    }

    if (event.ctrlKey && event.keyCode === 68) {
      event.preventDefault()
      if (this.state.selectedItem != "") {
        var copyList = Object.assign({}, this.state.theWireFrame)
        var copyItem = Object.assign({}, this.state.selectedItem)
        this.state.selectedItem.square = 0
        copyItem.x += 100
        copyItem.y += 100
        copyItem.square = 1
        copyItem.key = this.findBiggestKey(copyList)
        copyList.list.push(copyItem)
        this.setSelectedItem(event, copyItem)
        this.setState({didISave: false})
    
      }
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
    this.setState({
      [event.target.name]: event.target.value
    })
    
    var copyList = Object.assign({}, this.state.theWireFrame)
    copyList.name = target.value
    this.setState({theWireFrame: copyList})
 
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
      borderradius: "1px",
      x: "10",
      y: "10",
      width: "300px",
      height: "300px",
      square: 0
    }
    copy.list.push(newContainer)
    
    this.setState({ theWireFrame: copy })
    this.setState({didISave: false})
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
      borderradius: "1px",
      x: "10",
      y: "10",
      width: "140px",
      height: "30px",
      square: 0
    }
    copy.list.push(newLabel)
    this.setState({ theWireFrame: copy })
    this.setState({didISave: false})
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
      borderradius: "1px",
      x: "10",
      y: "10",
      width: "100px",
      height: "50px",
      square: 0
    }
    copy.list.push(newButton)
    this.setState({ theWireFrame: copy })
    this.setState({didISave: false})
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
      x: "10",
      y: "10",
      width: "200px",
      height: "75px",
      square: 0
    }
    copy.list.push(newTextfield)
    this.setState({ theWireFrame: copy })
    this.setState({didISave: false})
  }



  zoomIn = () => {

    var number = this.state.scaleNumber
    if (number * 2 < 8) {

      number = number * 2

      this.setState({ scaleNumber: number })
      this.setState({ xpos: 20 })
      this.setState({ ypos: 20 })
    }
  }

  zoomOut = () => {
    var number = this.state.scaleNumber
    if (number / 2 > 0) {

      number = number / 2

      this.setState({ scaleNumber: number })

    }

  }

  checkSaved = () => {
    console.log()
   
 
    if (this.state.didISave == false) {
      if (window.confirm("Save first?")) {

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
      this.setState({didISave: false})
    }
  }

  setSelectedItem = (event, currentItemSelected) => {

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

    document.getElementById("dimensionButton").style.visibility = "hidden"
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

    for(var x =0; x< this.state.theWireFrame.list.length; x++){
     
      this.state.theWireFrame.list[x].square = 0
    }
 
  }

  chagneDimensions = (event) => {

    this.setState({
      [event.target.name]: event.target.value
    })

    document.getElementById("dimensionButton").style.visibility = "visible"

  }

  changeSizes = () => {
    var width = parseInt(document.getElementById("theWidth").value)
    console.log(width)
    var height = parseInt(document.getElementById("theHeight").value)
    if (isNaN(width) == false && width >= 1 && width <= 5000) {
      document.getElementById("cleanDiv").style.width = width + "px"
    }
    if (isNaN(height) == false && height >= 1 && height <= 5000) {
      document.getElementById("cleanDiv").style.height = height + "px"
    }
  }

  saveWireFrame = () => {
    for(var x =0; x< this.state.theWireFrame.list.length; x++){
     
      this.state.theWireFrame.list[x].square = 0
      
    }
    console.log("hi")
    console.log(this.state.theWireFrame)
    console.log(this.state.theUser.wireFrameList)
    console.log("bye")
   
    const users = this.props.users
    for (var x in users) {
        if (users[x].id == this.props.auth.uid) {
            listy = users[x]
        }
    }

    var wireFrameArrayCopy = listy.wireFrameList
    for(var x =0; x<wireFrameArrayCopy.length; x++){
      if(wireFrameArrayCopy[x].key == this.state.theWireFrame.key){
          wireFrameArrayCopy[x]= this.state.theWireFrame
      }
    }
 
    
    const fireStore = getFirestore();
    fireStore.collection('users').doc(this.props.auth.uid).update({
      wireFrameList: wireFrameArrayCopy
  })
    this.setState({didISave: true})
  }

  saveToFalse = ()=>{
    this.setState({didISave: false})
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
    const width = this.state.width
    const height = this.state.height
    const name = this.state.name
    return (



      <div className="container white" id="changeWhiteContainer" onKeyDown={this.handleKeyDown}>
        {/* Row for the name */}

        <div className="row nameRow">
          <div className="col s3">
            <i className="material-icons prefix ">account_circle</i>
            <label className="nameAndPassword">Wireframe Name:</label>
          </div>
          <div className="col s9">
            <input type="text" name="name" id="name" onChange={this.handleChange} value={name} />
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
                    <i className="material-icons" onClick={this.saveWireFrame}>save</i>
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
            <div className="box" style={{ height: '660px', width: '995px', position: 'relative', overflow: 'auto', padding: '0' }}>
              <div className="boundThis" id="cleanDiv" style={{ height: '2000px', width: '2000px', padding: '10px', overflow: "auto" }} onClick={this.setItemSelectedEmpty}>
                {wireFrameItems && wireFrameItems.map(wireframe => (
                  <ItemsList wireFrameItem={wireframe} wireFrame={this.state.theWireFrame}setSelectedItem={this.setSelectedItem.bind(this)} scaleNumber={this.state.scaleNumber} saveToFalse={this.saveToFalse.bind(this)}/>
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
            <h6>Width: <input className="textboxy" type="text" id="theWidth" name="width" value={width} onChange={this.chagneDimensions} /></h6>
            <h6>Height: <input className="textboxy" type="text" id="theHeight" name="height" value={height} onChange={this.chagneDimensions} /></h6>
            <button id="dimensionButton" onClick={this.changeSizes}>Click to Dimensions</button>
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