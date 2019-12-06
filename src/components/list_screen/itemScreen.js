import React, { Component } from 'react'
import { firestoreConnect } from 'react-redux-firebase';
import { Modal, Button, Icon, Checkbox } from 'react-materialize'
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
export class itemScreen extends Component {

    state = {
        descriptionValue: this.props.location.state.theId.description,
        assignValue: this.props.location.state.theId.assigned_to,
        dateValue: this.props.location.state.theId.due_date,
        checkedValue: this.props.location.state.theId.completed

    }

    changeItem = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    
    changeComplete = () => {
        if (this.state.checkedValue == false) {
            this.setState({ checkedValue: true })
        } else {
            this.setState({ checkedValue: false })
        }
    }

    submitItem=()=>{
        var todoList = this.props.location.state.todoList
        var todoListItems = todoList.items
        var index = todoListItems.indexOf(this.props.location.state.theId)
        todoListItems[index].description = document.getElementById("itemdescriptiontext").value
        todoListItems[index].assigned_to = document.getElementById("itemassigntext").value
        todoListItems[index].due_date = document.getElementById("itemdatetext").value
        todoListItems[index].completed = this.state.checkedValue
        
        const fireStore = getFirestore();
        var hello = fireStore.collection('todoLists').doc(todoList.id)
        hello.update({
            items: todoListItems
        })
        this.reset()
    }

    reset=()=>{
        document.getElementById("itemdescriptiontext").value = ""
        document.getElementById("itemassigntext").value = ""
        document.getElementById("itemdatetext").value = ""
        this.setState({ checkedValue: false })
        this.props.history.push({
            pathname: "/todoList/" + this.props.location.state.todoList.id,
            state: {
                theId: this.props.location.state.todoList.id
            }
        })
    }

    render() {
        
        const descriptionValue = this.state.descriptionValue
        const assignValue = this.state.assignValue
        const dateValue = this.state.dateValue
        const checkedValue = this.state.checkedValue
        return (
            <div className="itemContainer container white">
                <h4>EDIT ITEM</h4>
                <h5>Description: <input className="textboxy" id="itemdescriptiontext" type="text" name="descriptionValue" value={descriptionValue} onChange={this.changeItem} /></h5>
                <h5>Assigned To: <input className="textboxy" id="itemassigntext" type="text" name="assignValue" value={assignValue} onChange={this.changeItem} /></h5>
                <h5>Due Date: <input className="textboxy" id="itemdatetext" type="date" name="dateValue" value={dateValue} onChange={this.changeItem} /></h5>
                <Checkbox label="Complete Status" value={checkedValue} checked={checkedValue} onChange={this.changeComplete} className="itemcheckBox" id="completetext" />

                <div className="inside modal-footer">
                    <a className="deleteButton modal-close waves-effect waves-green btn-flat" onClick={this.submitItem}>Yes</a>
                    <a className="deleteButton modal-close waves-effect waves-green btn-flat" onClick={this.reset}>No</a>
                </div>
            </div>
        )
    }
}

export default itemScreen
