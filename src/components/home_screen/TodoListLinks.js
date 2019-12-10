import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';
var theUser = ""
var orderedList = ""
class TodoListLinks extends React.Component {

    updateTime = (wireframe, copyList) => {

        var newDate = new Date() + ""
        for (var x = 0; x < copyList.length; x++) {

            if (copyList[x] == wireframe) {
                copyList[x].lastUpdate = newDate
            }
        }
        const fireStore = getFirestore();
        fireStore.collection('users').doc(this.props.auth.uid).update({
            wireFrameList: copyList
        })
    }



    render() {
        const users = this.props.users
        for (var x in users) {
            if (users[x].id == this.props.auth.uid) {
                theUser = users[x]
            }
        }

        var copyList = ""
        var copyUser =""
        var theWireframe = ""
        if (theUser.wireFrameList != undefined) {
            
            copyList = theUser.wireFrameList.slice()
            copyUser = Object.assign({},theUser)
           


            orderedList = theUser.wireFrameList.slice().sort(function (a, b) {
                var c = new Date(a.lastUpdate);
                var d = new Date(b.lastUpdate);
                return d - c;
            })

        }

        

        return (
            <div className="todo-lists section">
                {orderedList && orderedList.map(wireframe => (
                    <Link to={{
                        pathname: '/wireframe/' + wireframe.key,
                        state: {
                            theWireFrame: wireframe,
                            theUser: copyUser
                        
                        }
                    }}
                        onClick={this.updateTime.bind(this, wireframe, copyList)}
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