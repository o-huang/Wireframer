import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';
var theUser = ""
class TodoListLinks extends React.Component {

    // updateTime = (theId) => {

    //     const fireStore = getFirestore();
    //     var hello = fireStore.collection('todoLists').doc(theId)
    //     var date = new Date()
    //     hello.update({
    //         lastUpdate: date + ""
    //     })
    // }

    

    render() {
        const users = this.props.users
        for (var x in users){
            if (users[x].id = this.props.auth.uid){
                theUser = users[x]
            }
        }
        // console.log(theUser)
        // if(theUser != undefined){
        //     console.log(theUser.wireFrameList)
        // }
       
        return (
            <div className="todo-lists section">
                {theUser.wireFrameList && theUser.wireFrameList.map(wireframe => (
                    <Link to={{
                        pathname: '/todoList/' + wireframe.key,
                        // state: {
                        //     theId: wireframe.id
                        // }
                    }} 
                    // onClick={this.updateTime.bind(this, todoList.id)} 
                    >
                        
                        <TodoListCard wireframe={wireframe} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);