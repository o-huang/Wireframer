import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';
var theUser = ""
class TodoListCard extends React.Component {

    deleteWireFrame = (event) => {
        event.preventDefault()
        event.stopPropagation()


        if (window.confirm("Are you sure you want to delete this wireframe?")) {
            const users = this.props.users
            for (var x in users) {
                if (users[x].id == this.props.auth.uid) {
                    theUser = users[x]
                }
            }
            var theList = theUser.wireFrameList
            for (var x = 0; x < theList.length; x++) {
                if (theList[x] == this.props.wireframe) {
                    theList.splice(x, 1)
                }
            }

            const fireStore = getFirestore();
            fireStore.collection('users').doc(this.props.auth.uid).update({
                wireFrameList: theList
            })
        } else {

        }
    }

    render() {
        const { wireframe } = this.props;
        return (
            <div className="collection z-depth-3 todoListArea" id="change">
                <div className="collection-item  grey lighten-5">
                    <span className="card-title">{wireframe.name}</span>
                    <i className="material-icons homeDelete" onClick={this.deleteWireFrame} >cancel</i>
                </div>
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

export default compose(connect(mapStateToProps))(TodoListCard);