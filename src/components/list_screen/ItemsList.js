import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { firestoreConnect } from 'react-redux-firebase';
import { Modal, Button, Icon, Checkbox } from 'react-materialize'
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';

class ItemsList extends React.Component {

    selected = () => {
        console.log("hi")
    }

    render() {
        const { wireFrameItem } = this.props;


        const divStyle = {
            fontSize: wireFrameItem.fontsize,
            backgroundColor: wireFrameItem.background,
            borderColor: wireFrameItem.bordercolor,
            borderWidth: wireFrameItem.borderthickness,
            borderRadius: wireFrameItem.borderradius,
        }

        const labelStyle = {
            border: "1px solid",
            fontSize: wireFrameItem.fontsize,
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
            backgroundColor: wireFrameItem.background,
            borderColor: wireFrameItem.bordercolor,
            borderWidth: wireFrameItem.borderthickness,
            borderRadius: wireFrameItem.borderradius,
        }

        let thing = ""
        if (wireFrameItem.type == "button") {
            thing = (
                <button style={divStyle} id="newButton" className="zoom">{wireFrameItem.text}</button>
            )
        }
        else if (wireFrameItem.type == "label") {
            thing = (
                <div className="zoom">
                    <label style={labelStyle}>{wireFrameItem.text}</label>
                </div>
                
            )
        } else if (wireFrameItem.type == "container") {
            thing = (
                <div style={containerStyle} className="zoom"></div>
            )
        } else {
            thing = (
                <input type="text" style={textFieldStyle} placeholder="input" value={wireFrameItem.text} className="browser-default zoom" id="inputTextBox" />
            )
        }

        return (
            <Draggable>
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