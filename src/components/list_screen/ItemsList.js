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
        // console.log(event.target.parentElement)
        // var btn = document.createElement("BUTTON")
        // btn.innerHTML= "hi"
        // event.target.parentElement.appendChild(btn)

    }

    render() {
        const { wireFrameItem } = this.props;
        // console.log(wireFrameItem)

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
            width: "100px"
        
            
        };
        let thing = ""
        if (wireFrameItem.type == "button") {
            thing = (
                <Rnd style={style} id="helloworld" size={{ width: this.state.width, height: this.state.height }}
                    position={{ x: this.state.x, y: this.state.y }}
                    onDragStop={(e, d) => {
                        this.props.wireFrameItem.x = d.x
                        this.props.wireFrameItem.y = d.y
                        this.setState({ x: d.x, y: d.y })
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {

                        this.props.wireFrameItem.width = ref.style.width
                        this.props.wireFrameItem.height = ref.style.height
                        this.setState({

                            width: ref.style.width,
                            height: ref.style.height,
                            ...position,
                        });
                    }} >
                    <button style={buttonStyle} className="zoom" onClick={this.selected}>{wireFrameItem.text} </button>
                </Rnd>
            )
        }
        else if (wireFrameItem.type == "label") {
            thing = (
                <Rnd style={style} size={{ width: this.state.width, height: this.state.height }}
                    position={{ x: this.state.x, y: this.state.y }}
                    onDragStop={(e, d) => {
                        this.props.wireFrameItem.x = d.x
                        this.props.wireFrameItem.y = d.y
                        this.setState({ x: d.x, y: d.y })
                    }}
            
                    onResizeStop={(e, direction, ref, delta, position) => {

                        this.props.wireFrameItem.width = ref.style.width
                        this.props.wireFrameItem.height = ref.style.height
                        this.setState({

                            width: ref.style.width,
                            height: ref.style.height,
                            ...position,
                        });
                    }}>
                    <label style={labelStyle} onClick={this.selected} >{wireFrameItem.text}</label>
                </Rnd>
            )
        } else if (wireFrameItem.type == "container") {
            thing = (
                <Rnd style={style} size={{ width: this.state.width, height: this.state.height }}
                    position={{ x: this.state.x, y: this.state.y }}
                    onDragStop={(e, d) => {
                        this.props.wireFrameItem.x = d.x
                        this.props.wireFrameItem.y = d.y
                        this.setState({ x: d.x, y: d.y })
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {

                        this.props.wireFrameItem.width = ref.style.width
                        this.props.wireFrameItem.height = ref.style.height
                        this.setState({

                            width: ref.style.width,
                            height: ref.style.height,
                            ...position,
                        });
                    }}>
                    <div style={containerStyle}  onClick={this.selected}></div>
                </Rnd>
            )
        } else {
            thing = (
                <Rnd style={style} size={{ width: this.state.width, height: this.state.height }}
                    position={{ x: this.state.x, y: this.state.y }}
                    onDragStop={(e, d) => {
                        this.props.wireFrameItem.x = d.x
                        this.props.wireFrameItem.y = d.y
                        this.setState({ x: d.x, y: d.y })
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {

                        this.props.wireFrameItem.width = ref.style.width
                        this.props.wireFrameItem.height = ref.style.height
                        this.setState({

                            width: ref.style.width,
                            height: ref.style.height,
                            ...position,
                        });
                    }}>
                    <input type="text" style={textFieldStyle} placeholder="input" value={wireFrameItem.text} className="browser-default" id="inputTextBox" onClick={this.selected} />
                </Rnd>
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