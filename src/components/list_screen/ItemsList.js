import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Modal, Button, Icon, Checkbox } from 'react-materialize'
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';

var desCounterr = 0
var dateCounterr = 0
var comCounterr = 0
const Item = {
    assigned_to: "",
    completed: false,
    description: "",
    due_date: "",

}
class ItemsList extends React.Component {
    state = {
        checkedValue: false,
    }

    updateFireBaseList(todoList) {
        const fireStore = getFirestore();
        var hello = fireStore.collection('todoLists').doc(todoList.id)
        hello.update({
            items: todoList.items
        })

    }


    sortByTask = () => {


        const fireStore = getFirestore();
        const todoList = this.props.todoList;
        var hi = fireStore.collection('todoLists').doc(todoList.id)
        hi.orderBy("description")
        
    }

    compareDescription(a, b) {
        if (a.description < b.description) {
            return -1;
        }
        if (a.description > b.description) {
            return 1;
        }
        return 0;
    }

    compareDescriptionRev(a, b) {
        if (a.description < b.description) {
            return 1;
        }
        if (a.description > b.description) {
            return -1;
        }
        return 0;
    }

    compareDate(a, b) {
        if (a.due_date < b.due_date) {
            return -1;
        }
        if (a.due_date > b.due_date) {
            return 1;
        }
        return 0;
    }

    compareDateRev(a, b) {
        if (a.due_date < b.due_date) {
            return 1;
        }
        if (a.due_date > b.due_date) {
            return -1;
        }
        return 0;
    }

    compareComplete(a, b) {
        if (a.completed < b.completed) {
            return -1;
        }
        if (a.completed > b.completed) {
            return 1;
        }
        return 0;
    }

    compareCompleteRev(a, b) {
        if (a.completed < b.completed) {
            return 1;
        }
        if (a.completed > b.completed) {
            return -1;
        }
        return 0;
    }

    organizeTask = (word) => {

        if (word == "task") {
            const todoList = this.props.todoList;

            if (desCounterr % 2 == 0) {

                todoList.items.sort(this.compareDescription)
                desCounterr++
                console.log(todoList)
                console.log(desCounterr)
            } else {
                todoList.items.sort(this.compareDescriptionRev)
                desCounterr++
                console.log(todoList)
                console.log(desCounterr)
            }
            this.updateFireBaseList(todoList)
        }
        else if (word == "date") {
            const todoList = this.props.todoList;

            if (dateCounterr % 2 == 0) {
                todoList.items.sort(this.compareDate)
                dateCounterr++

            } else {
                todoList.items.sort(this.compareDateRev)
                dateCounterr++

            }
            this.updateFireBaseList(todoList)
        } else {
            const todoList = this.props.todoList;

            if (comCounterr % 2 == 0) {
                todoList.items.sort(this.compareComplete)
                comCounterr++

            } else {
                todoList.items.sort(this.compareCompleteRev)
                comCounterr++

            }
            this.updateFireBaseList(todoList)
        }
    }

    findBiggestKeyItem = (todoList) => {
        var number = -1
        for (var i = 0; i < todoList.items.length; i++) {

            if (todoList.items[i].key > number) {
                number = todoList.items[i].key
            }
        }
        return number
    }

    reset = () => {
        document.getElementById("descriptiontext").value = ""
        document.getElementById("assigntext").value = ""
        document.getElementById("datetext").value = ""
        this.setState({ checkedValue: false })
    }

    submitItem = () => {
        const todoList = this.props.todoList;
        let newitem = Object.assign({}, todoList.items[0])
        var keyAndId = this.findBiggestKeyItem(todoList) + 1
        newitem.key = keyAndId
        newitem.id = keyAndId
        newitem.description = document.getElementById("descriptiontext").value
        newitem.assigned_to = document.getElementById("assigntext").value
        newitem.due_date = document.getElementById("datetext").value
        if (document.getElementById("completetext").value == "false") {
            newitem.completed = false
        } else {
            newitem.completed = true
        }
        todoList.items.push(newitem)
        this.updateFireBaseList(todoList)
        this.reset()
    }

    changeComplete = () => {
        if (this.state.checkedValue == false) {
            this.setState({ checkedValue: true })
        } else {
            this.setState({ checkedValue: false })
        }
    }

    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">

                <div className="list_item_header_card light-green lighten-2 z-depth-5">
                    <div className="list_item_task_header" onClick={() => this.organizeTask("task")}>Task</div>
                    <div className="list_item_due_date_header" onClick={() => this.organizeTask("date")}>Due Date</div>
                    <div className="list_item_status_header" onClick={() => this.organizeTask("status")}>Status</div>
                </div>
                {items && items.map(item => {
                    item.id = item.key;
                    var x = <Link to={{
                        pathname: '/todoList/' + todoList.id + "/" + item.id,
                        state: {
                            theId: item,
                            todoList: this.props.todoList
                        }
                    }}>
                        <ItemCard todoList={todoList}  item={item} />
                    </Link>
                    return (
                        x
                    );
                })
                }

                <Modal
                    header='ADD A ITEM'
                    trigger={<i className="medium material-icons" id="addlist">add</i>}>

                    <h5>Description: <input className="textboxy" id="descriptiontext" type="text" name="descriptionValue" /></h5>
                    <h5>Assigned To: <input className="textboxy" id="assigntext" type="text" name="assignValue" /></h5>
                    <h5>Due Date: <input className="textboxy" id="datetext" type="date" name="dateValue" /></h5>
                    <Checkbox label="Complete Status" value={this.state.checkedValue} checked={this.state.checkedValue} onChange={this.changeComplete} className="checkBox" id="completetext" />

                    <div className="inside modal-footer">
                        <a className="deleteButton modal-close waves-effect waves-green btn-flat" onClick={this.submitItem}>Yes</a>
                        <a className="deleteButton modal-close waves-effect waves-green btn-flat" onClick={this.reset}>No</a>
                    </div>
                </Modal>

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