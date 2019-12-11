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

class ItemsList extends React.Component {

    selected = (event) => {
        const { wireFrameItem } = this.props;
        this.props.setSelectedItem(event,wireFrameItem)
    }

    render() {
        const { wireFrameItem } = this.props;


        const divStyle = {
            fontSize: wireFrameItem.fontsize,
            color:wireFrameItem.fontcolor,
            backgroundColor: wireFrameItem.background,
            borderColor: wireFrameItem.bordercolor,
            borderWidth: wireFrameItem.borderthickness,
            borderRadius: wireFrameItem.borderradius,
       
        }

        const labelStyle = {
            border: "1px solid",
            fontSize: wireFrameItem.fontsize,
            color:wireFrameItem.fontcolor,
            backgroundColor: wireFrameItem.background,
            borderColor: wireFrameItem.bordercolor,
            borderWidth: wireFrameItem.borderthickness,
            borderRadius: wireFrameItem.borderradius,
        }

        const containerStyle = {
            border: "1px solid",
            height: "60px",
            width: "120px",
            backgroundColor: wireFrameItem.background,
            borderColor: wireFrameItem.bordercolor,
            borderWidth: wireFrameItem.borderthickness,
            borderRadius: wireFrameItem.borderradius,
        }

        const textFieldStyle = {
            fontSize: wireFrameItem.fontsize,
            color:wireFrameItem.fontcolor,
            backgroundColor: wireFrameItem.background,
            borderColor: wireFrameItem.bordercolor,
            borderWidth: wireFrameItem.borderthickness,
            borderRadius: wireFrameItem.borderradius,
        }

        let thing = ""
        if (wireFrameItem.type == "button") {
            thing = (
                <button style={divStyle} className="zoom" onClick={this.selected}>{wireFrameItem.text} </button>
            )
        }
        else if (wireFrameItem.type == "label") {
            thing = (
                <div className="zoom changeWidth">
                    <label style={labelStyle} onClick={this.selected}>{wireFrameItem.text}</label>
                </div>

            )
        } else if (wireFrameItem.type == "container") {
            thing = (
                <div style={containerStyle} className="zoom" onClick={this.selected}></div>
            )
        } else {
            thing = (
                <input type="text" style={textFieldStyle} placeholder="input" value={wireFrameItem.text} className="browser-default zoom" id="inputTextBox" onClick={this.selected}/>
            )
        }

        return (
                <Draggable bounds=".boundThis">
                    <div className="changeWidth" >
                        {thing}
                    </div>
                </Draggable>
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