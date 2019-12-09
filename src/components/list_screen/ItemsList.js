import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { firestoreConnect } from 'react-redux-firebase';
import { Modal, Button, Icon, Checkbox } from 'react-materialize'
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';

class ItemsList extends React.Component {


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

       
      
        let thing = ""
        if (wireFrameItem.type == "button") {
            thing = (

                <button style={divStyle} id ="newButton">{wireFrameItem.text}</button>
                
            )
        }
        
        
        else if (wireFrameItem.type == "label") {
            thing = (

                <label style={labelStyle} >{wireFrameItem.text}</label>

            )
        } else if (wireFrameItem.type == "container") {
            thing = (
                <div>
                    <div style={containerStyle}></div>
                </div>

            )

        } else {

            thing = (
                <div>
                     <input type="text" placeholder="input"  />
                </div>
            )

        }
      


        return (
            <Draggable>

                <div >
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