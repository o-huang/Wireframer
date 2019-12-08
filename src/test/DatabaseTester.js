import React from 'react'
import { connect } from 'react-redux';
import todoJson from './TestTodoListData.json'
import { getFirestore } from 'redux-firestore';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('users').doc(this.props.auth.uid).update({
            wireFrameList: []
        })
    }
    handleReset = () => {
        const fireStore = getFirestore();
        var currentdate = new Date() + ""
        var wireframeArray = []
        todoJson.todoLists.forEach(todoListJson => {
            var newArray ={name:todoListJson.name,list:todoListJson.items,lastUpdate: currentdate,key:todoListJson.key}
            wireframeArray.push(newArray)
        });
        
        fireStore.collection('users').doc(this.props.auth.uid).update({
            wireFrameList: wireframeArray
        }).then(() => {
            console.log("DATABASE RESET");
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
     
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
    
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);