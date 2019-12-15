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
        for (var x = 0; x < this.props.wireFrame.list.length; x++) {

            this.props.wireFrame.list[x].square = 0
        }
        wireFrameItem.square = 1
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
                        enableResizing={ {top:false, right:false, bottom:false, left:false, topRight:true, bottomRight:true, bottomLeft:true, topLeft:true }}
                        scale={this.props.scaleNumber}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            console.log(this.props.wireFrameItem.square)
                            this.props.wireFrameItem.x = position.x
                            this.props.wireFrameItem.y = position.y
                            this.props.wireFrameItem.width = ref.style.width
                            this.props.wireFrameItem.height = ref.style.height
                            this.props.saveToFalse()
                          
                        }} >
                        <button style={buttonStyle} className="zoom" onClick={this.selected} >{wireFrameItem.text} </button>

                        <div className={this.props.wireFrameItem.square == 0 ? "tl square" : "tl squareVisiable"}></div>
                        <div className={this.props.wireFrameItem.square == 0 ? "tr square" : "tr squareVisiable"}></div>
                        <div className={this.props.wireFrameItem.square == 0 ? "bl square" : "bl squareVisiable"}></div>
                        <div className={this.props.wireFrameItem.square == 0 ? "br square" : "br squareVisiable"}></div>
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
                        enableResizing={ {top:false, right:false, bottom:false, left:false, topRight:true, bottomRight:true, bottomLeft:true, topLeft:true }}
                        scale={this.props.scaleNumber}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            this.props.wireFrameItem.x = position.x
                            this.props.wireFrameItem.y = position.y
                            this.props.wireFrameItem.width = ref.style.width
                            this.props.wireFrameItem.height = ref.style.height
                            this.props.saveToFalse()

                        }} >
                        <label style={labelStyle} onClick={this.selected} >{wireFrameItem.text}</label>
                        <div className={this.props.wireFrameItem.square == 0 ? "tl square" : "tl squareVisiable"}></div>
                        <div className={this.props.wireFrameItem.square == 0 ? "tr square" : "tr squareVisiable"}></div>
                        <div className={this.props.wireFrameItem.square == 0 ? "bl square" : "bl squareVisiable"}></div>
                        <div className={this.props.wireFrameItem.square == 0 ? "br square" : "br squareVisiable"}></div>
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
                        enableResizing={ {top:false, right:false, bottom:false, left:false, topRight:true, bottomRight:true, bottomLeft:true, topLeft:true }}
                        scale={this.props.scaleNumber}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            this.props.wireFrameItem.x = position.x
                            this.props.wireFrameItem.y = position.y
                            this.props.wireFrameItem.width = ref.style.width
                            this.props.wireFrameItem.height = ref.style.height
                            this.props.saveToFalse()

                        }} >
                        <div style={containerStyle} onClick={this.selected}></div>
                        <div className={this.props.wireFrameItem.square == 0 ? "tl square" : "tl squareVisiable"}></div>
                        <div className={this.props.wireFrameItem.square == 0 ? "tr square" : "tr squareVisiable"}></div>
                        <div className={this.props.wireFrameItem.square == 0 ? "bl square" : "bl squareVisiable"}></div>
                        <div className={this.props.wireFrameItem.square == 0 ? "br square" : "br squareVisiable"}></div>
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
                        enableResizing={ {top:false, right:false, bottom:false, left:false, topRight:true, bottomRight:true, bottomLeft:true, topLeft:true }}
                        scale={this.props.scaleNumber}
                        onResizeStop={(e, direction, ref, delta, position) => {

                            this.props.wireFrameItem.x = position.x
                            this.props.wireFrameItem.y = position.y
                            this.props.wireFrameItem.width = ref.style.width
                            this.props.wireFrameItem.height = ref.style.height
                            this.props.saveToFalse()

                        }} >
                        <input type="text" style={textFieldStyle} placeholder="input" value={wireFrameItem.text} className="browser-default" id="inputTextBox" onClick={this.selected} />
                        <div className={this.props.wireFrameItem.square == 0 ? "tl square" : "tl squareVisiable"}></div>
                        <div className={this.props.wireFrameItem.square == 0 ? "tr square" : "tr squareVisiable"}></div>
                        <div className={this.props.wireFrameItem.square == 0 ? "bl square" : "bl squareVisiable"}></div>
                        <div className={this.props.wireFrameItem.square == 0 ? "br square" : "br squareVisiable"}></div>
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