import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import trashcan from '../../images/trashcan.png'
import { Link } from 'react-router-dom';

import { Modal, Button, Icon } from 'react-materialize'
class ListScreen extends Component {
  // state = {
  //   name: '',
  //   owner: '',
  // }

  // handleChange = (e) => {
  //   const { target } = e;

  //   this.setState(state => ({
  //     ...state,
  //     [target.id]: target.value,
  //   }));

  //   const { theId } = this.props.location.state
  //   const fireStore = getFirestore();
  //   var hello = fireStore.collection('todoLists').doc(theId)
  //   console.log(this.state.name)
  //   if (target.id == "name") {
  //     hello.update({
  //       name: target.value
  //     })
  //   }
  //   if (target.id == "owner") {
  //     hello.update({
  //       owner: target.value
  //     })
  //   }
  // }

  // DeleteList = () => {
  //   const { theId } = this.props.location.state
  //   const fireStore = getFirestore();
  //   fireStore.collection('todoLists').doc(theId).delete()

  // }

  render = () => {

    
    // const auth = this.props.auth;
    // const todoList = this.props.todoList;


    // if (!auth.uid) {
    //   return <Redirect to="/" />;
    // }
    // if (!todoList) {
    //   return <React.Fragment />
    // }
    return (
      <h1>daw</h1>
    //   <div className="container white">
    //     <div className="row">
    //       <h5 className="grey-text text-darken-3 todoListLetter">Todo List</h5>
    //       <Modal
    //         header='Delete List'
    //         trigger={<img src={trashcan} id="list_trash" width="25" height="40" />}>
    //         <h5>Are you sure you want to delete this list?</h5>
    //         <h6>The list will not be retreivable!!</h6>
    //         <div className="inside modal-footer">
    //           <Link to="/" onClick={this.DeleteList} className="deleteButton modal-close waves-effect waves-green btn-flat">Yes</Link>
    //           <a className="deleteButton modal-close waves-effect waves-green btn-flat">No</a>
    //         </div>
    //       </Modal>

    //     </div>
    //     <themodal />
    //     <div className="row">
    //       <div className="col s6">
    //         <i className="material-icons prefix ">account_circle</i>
    //         <label className="nameAndPassword">Name</label>
    //         <input type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
    //       </div>
    //       <div className="col s6">
    //         <i className="material-icons prefix">account_circle</i>
    //         <label className="nameAndPassword">Owner</label>
    //         <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
    //       </div>
    //     </div>
    //     <ItemsList todoList={todoList} />
    //   </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if (todoList) {
    todoList.id = id;
  }
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
)(ListScreen);