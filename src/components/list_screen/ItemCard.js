import React from 'react';
import { Modal, Button, Icon } from 'react-materialize'
import { getFirestore } from 'redux-firestore';


class ItemCard extends React.Component {
    checkCompleted(hi) {
        if (hi) {
            return <p className="list_item_card_completed">Completed</p>
        } else {
            return <p className='list_item_card_not_completed'>Pending</p>
        }
    }

    updateFireBaseList(todoList) {
        const fireStore = getFirestore();
        var hello = fireStore.collection('todoLists').doc(todoList.id)
        hello.update({
            items: todoList.items
        })
    }

    deleteList = (event) => {
        event.preventDefault()
        const { todoList } = this.props
        const { item } = this.props
        var itemIndex = todoList.items.indexOf(item)

        todoList.items.splice(itemIndex, 1);
        this.updateFireBaseList(todoList)
    }

    moveDown = (event) => {
        event.preventDefault()
        const { todoList } = this.props
        const { item } = this.props
        var index = todoList.items.indexOf(item)
        var lengthOfArray = todoList.items.length
        if (index != lengthOfArray - 1) {
            var temp = todoList.items[index + 1]
            todoList.items[index + 1] = item
            todoList.items[index] = temp
        }
        this.updateFireBaseList(todoList)
    }

    moveUp = (event) => {
        event.preventDefault()
        const { todoList } = this.props
        const { item } = this.props
        var index = todoList.items.indexOf(item)

        if (index != 0) {
            var temp = todoList.items[index - 1]
            todoList.items[index - 1] = item
            todoList.items[index] = temp

        }
        this.updateFireBaseList(todoList)
    }

    checkIfFirstIndex = () => {
        const { todoList } = this.props
        const { item } = this.props
        var index = todoList.items.indexOf(item)
        if (index == 0) {
            return <Button floating className="grey" >
                <i className="floatButton material-icons" onClick={this.moveUp}>keyboard_arrow_up</i>
            </Button>
        }
        return <Button floating className="light-green lighten-2" >
            <i className="floatButton material-icons" onClick={this.moveUp}>keyboard_arrow_up</i>
        </Button>
    }

    checkIfLastIndex = () => {
        const { todoList } = this.props
        const { item } = this.props
        var index = todoList.items.indexOf(item)
        if (index == todoList.items.length - 1) {
            return <Button floating className="grey" >
                <i className="floatButton material-icons" onClick={this.moveDown}>keyboard_arrow_down</i>
            </Button>
        }
        return <Button floating className="light-green lighten-2" >
            <i className="floatButton material-icons" onClick={this.moveDown}>keyboard_arrow_down</i>
        </Button>
    }

    render() {
        const { item } = this.props;
        return (
            <div id="myListItems">
                <div className="collection z-depth-1">
                    <div className="collection-item avatar">
                        <i className="material-icons circle light-green lighten-2">list</i>
                        <h5 className="list_item_card_description" >{item.description}</h5>
                        <p className="list_item_card_assigned_to" >Assigned To: {item.assigned_to}</p>
                        <p className="list_item_card_due_date" >{item.due_date}</p>
                        {
                            this.checkCompleted(item.completed)
                        }
                        <Button
                            floating
                            fab={{ direction: 'left' }}
                            className="myFAB red"
                            large
                        >
                            {
                                this.checkIfFirstIndex()
                            }
                            {
                                this.checkIfLastIndex()
                            }
                            <Button floating className="yellow darken-1" >
                                <i className="floatButton material-icons" onClick={this.deleteList}>close</i>
                            </Button>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemCard;