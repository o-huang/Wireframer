import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { firestoreConnect } from 'react-redux-firebase';
import { Modal, Button, Icon, Checkbox } from 'react-materialize'
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';

class ItemsList extends React.Component {


    render() {
        const {wireFrameItem } = this.props;
        console.log(wireFrameItem)
        var body = document.getElementById("theItemContainer")
        if(wireFrameItem.type == "button"){
            var btn = document.createElement("BUTTON");
            btn.innerHTML = "CLICK ME";
            body.appendChild(btn);
        }
        if(wireFrameItem.type == "label"){
            var label = document.createElement("LABEL")
            label.innerHTML = "I'm a label"
            body.appendChild(label)
        }
        if(wireFrameItem.type == "container"){
            var container = document.createElement("DIV")
            container.setAttribute("class","propContainer")
            body.appendChild(container)
        }
        return (
            <div>
                <h1>hi</h1>
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