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
class ItemsList extends React.Component {

    selected = (event) => {
        const { wireFrameItem } = this.props;
        this.props.setSelectedItem(event, wireFrameItem)
        console.log("hi")
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
            border: "solid 1px #ddd",
            background: "#f0f0f0",
        };

        let thing = ""
        if (wireFrameItem.type == "button") {
            thing = (
                <Rnd style={style} >
                    <button style={buttonStyle} className="" onClick={this.selected}>{wireFrameItem.text} </button>
                </Rnd>
            )
        }
        else if (wireFrameItem.type == "label") {
            thing = (
                <Rnd style={style}  >
                    <label style={labelStyle} onClick={this.selected} className="">{wireFrameItem.text}</label>
                </Rnd>
            )
        } else if (wireFrameItem.type == "container") {
            thing = (
                <Rnd style={style} default={{
                    x: 0,
                    y: 0,
                    width: 320,
                    height: 200
                }}>
                    <div style={containerStyle} className="" onClick={this.selected}></div>

                </Rnd>
            )
        } else {
            thing = (
                <Rnd style={style} onClick={this.selected} >
                    <input type="text" style={textFieldStyle} placeholder="input" value={wireFrameItem.text} className="browser-default" id="inputTextBox" />
                </Rnd>
            )
        }

        return (
            <div>
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