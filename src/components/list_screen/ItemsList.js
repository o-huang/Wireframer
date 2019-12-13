import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { firestoreConnect } from 'react-redux-firebase';
import { Modal, Button, Icon, Checkbox } from 'react-materialize'
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import { Resizable } from "re-resizable";
import { Rnd } from "react-rnd";

import interact from 'interactjs'
import { transform } from '@babel/core';
import { pointer } from '@interactjs/utils';
class ItemsList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            wire: this.props.wireFrameItem,
            x: this.props.wireFrameItem.x,
            y: this.props.wireFrameItem.y,
            width: this.props.wireFrameItem.width,
            height: this.props.wireFrameItem.height,
        }
    }





    selected = (event) => {
        const { wireFrameItem } = this.props;
        this.props.setSelectedItem(event, wireFrameItem)
      
        var allSquare = document.getElementsByClassName("square")

        for (var x = 0; x < allSquare.length; x++) {
            allSquare[x].style.visibility = "hidden"
        }

        for (var x = 0; x < event.target.parentElement.childNodes.length; x++) {
            if (event.target.parentElement.childNodes[x].className.includes("square")) {
                event.target.parentElement.childNodes[x].style.visibility = "visible"
            }
        }
    }

    render() {
        const { wireFrameItem } = this.props;
     

        const buttonStyle = {
            fontSize: wireFrameItem.fontsize,
            color: wireFrameItem.fontcolor,
            backgroundColor: wireFrameItem.background,
            borderColor: wireFrameItem.bordercolor,
            borderWidth: wireFrameItem.borderthickness,
            borderRadius: wireFrameItem.borderradius,
            width: "100%",
            height: "100%",
            overflow: "hidden"

        }

        const labelStyle = {
            border: "1px solid",
            fontSize: wireFrameItem.fontsize,
            color: wireFrameItem.fontcolor,
            backgroundColor: wireFrameItem.background,
            borderColor: wireFrameItem.bordercolor,
            borderWidth: wireFrameItem.borderthickness,
            borderRadius: wireFrameItem.borderradius,
            width: "100%",
            height: "100%",
            overflow: "hidden"
        }

        const containerStyle = {
            border: "1px solid",
            height: "60px",
            width: "120px",
            backgroundColor: wireFrameItem.background,
            borderColor: wireFrameItem.bordercolor,
            borderWidth: wireFrameItem.borderthickness,
            borderRadius: wireFrameItem.borderradius,
            width: "100%",
            height: "100%",
        }

        const textFieldStyle = {
            fontSize: wireFrameItem.fontsize,
            color: wireFrameItem.fontcolor,
            backgroundColor: wireFrameItem.background,
            borderColor: wireFrameItem.bordercolor,
            borderWidth: wireFrameItem.borderthickness,
            borderRadius: wireFrameItem.borderradius,
            width: "100%",
            height: "100%",

        }
        const style = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // border: "solid 1px #ddd",
            // background: "#f0f0f0",
        };

        let thing = ""
        if (wireFrameItem.type == "button") {
            thing = (
                <div className="zoom" style={{ transform: "scale(" + this.props.scaleNumber + ")" }}>
                    <Rnd style={style} size={{ width: this.props.wireFrameItem.width, height: this.props.wireFrameItem.height }}
                        position={{ x: this.props.wireFrameItem.x, y: this.props.wireFrameItem.y }}
                        onDragStop={(e, d) => {
                            this.props.wireFrameItem.x = d.x
                            this.props.wireFrameItem.y = d.y
                            this.props.saveToFalse()
                        }}
                        scale={this.props.scaleNumber}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            this.props.wireFrameItem.x = position.x
                            this.props.wireFrameItem.y = position.y
                            this.props.wireFrameItem.width = ref.style.width
                            this.props.wireFrameItem.height = ref.style.height
                            this.props.saveToFalse()
                        }} >
                        <button style={buttonStyle} className="zoom" onClick={this.selected}>{wireFrameItem.text} </button>
                        <div className="tl square"></div>
                        <div className="tr square"></div>
                        <div className="bl square"></div>
                        <div className="br square"></div>
                    </Rnd>
                </div>
            )
        }
        else if (wireFrameItem.type == "label") {
            thing = (
                <div className="zoom" style={{ transform: "scale(" + this.props.scaleNumber + ")" }}>
                    <Rnd style={style} size={{ width: this.props.wireFrameItem.width, height: this.props.wireFrameItem.height }}
                        position={{ x: this.props.wireFrameItem.x, y: this.props.wireFrameItem.y }}
                        onDragStop={(e, d) => {
                            this.props.wireFrameItem.x = d.x
                            this.props.wireFrameItem.y = d.y
                            this.props.saveToFalse()
                        }}
                        scale={this.props.scaleNumber}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            this.props.wireFrameItem.x = position.x
                            this.props.wireFrameItem.y = position.y
                            this.props.wireFrameItem.width = ref.style.width
                            this.props.wireFrameItem.height = ref.style.height
                            this.props.saveToFalse()

                        }} >
                        <label style={labelStyle} onClick={this.selected} >{wireFrameItem.text}</label>
                        <div className="tl square"></div>
                        <div className="tr square"></div>
                        <div className="bl square"></div>
                        <div className="br square"></div>
                    </Rnd>
                </div>
            )
        } else if (wireFrameItem.type == "container") {
            thing = (
                <div className="zoom" style={{ transform: "scale(" + this.props.scaleNumber + ")" }}>
                    <Rnd style={style} size={{ width: this.props.wireFrameItem.width, height: this.props.wireFrameItem.height }}
                        position={{ x: this.props.wireFrameItem.x, y: this.props.wireFrameItem.y }}
                        onDragStop={(e, d) => {
                            this.props.wireFrameItem.x = d.x
                            this.props.wireFrameItem.y = d.y
                            this.props.saveToFalse()
                        }}
                        scale={this.props.scaleNumber}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            this.props.wireFrameItem.x = position.x
                            this.props.wireFrameItem.y = position.y
                            this.props.wireFrameItem.width = ref.style.width
                            this.props.wireFrameItem.height = ref.style.height
                            this.props.saveToFalse()

                        }} >
                        <div style={containerStyle} onClick={this.selected}></div>
                        <div className="tl square"></div>
                        <div className="tr square"></div>
                        <div className="bl square"></div>
                        <div className="br square"></div>
                    </Rnd>
                </div>
            )
        } else {
            thing = (
                <div className="zoom" style={{ transform: "scale(" + this.props.scaleNumber + ")" }}>
                    <Rnd style={style} size={{ width: this.props.wireFrameItem.width, height: this.props.wireFrameItem.height }}
                        position={{ x: this.props.wireFrameItem.x, y: this.props.wireFrameItem.y }}
                        onDragStop={(e, d) => {
                         
                          
                            this.props.wireFrameItem.x = d.x
                            this.props.wireFrameItem.y = d.y
                            this.props.saveToFalse()
                        }}
                        scale={this.props.scaleNumber}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            
                            this.props.wireFrameItem.x =position.x
                            this.props.wireFrameItem.y =position.y
                            this.props.wireFrameItem.width = ref.style.width
                            this.props.wireFrameItem.height = ref.style.height
                            this.props.saveToFalse()

                        }} >
                        <input type="text" style={textFieldStyle} placeholder="input" value={wireFrameItem.text} className="browser-default" id="inputTextBox" onClick={this.selected} />
                        <div className="tl square"></div>
                        <div className="tr square"></div>
                        <div className="bl square"></div>
                        <div className="br square"></div>
                    </Rnd>
                </div>
            )
        }
        return (
            <div >
                {thing}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);