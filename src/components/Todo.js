import React,{ useState } from "react";
import '../designs/Todo.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
function Todo({todo,todoUpdateCallBack, notifyItemDelete}) {
    const [editMode, setEditMode] = useState(false);
    const [displayingTodo, setDisplayingTodo] = useState(todo);


    const options = {
        title: 'Confirm delete?',
        message: 'Are you sure to delete this item from your todo list forever?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    notifyItemDelete(todo.id)
                }
            },
            {
                label: 'No',
                onClick: () => alert('Clicked No')
            }
        ],
        childrenElement: () => <div />,
        // customUI: ({ onClose }) => <div>Custom UI</div>,
        closeOnEscape: true,
        closeOnClickOutside: true,
        willUnmount: () => {},
        afterClose: () => {},
        onClickOutside: () => {},
        onKeypressEscape: () => {},
        overlayClassName: "overlay-custom-class-name"
    };

    function handleToggle(){
        // todo.completed = !todo.completed
        // setDisplayingTodo({id: todo.id, description: displayingTodo.description, completed: !todo.completed})
        const editted_todo = {id: todo.id, description: displayingTodo.description, completed: !todo.completed}
        todoUpdateCallBack(editted_todo)
        setDisplayingTodo(editted_todo)

    }
    function handleDelete(){
        confirmAlert(options);

    }
    function handleEditCancelButtonClick(){
        // alert("Hi I am here")
        if (!editMode){
            setEditMode(!editMode)
            //toggle edit now
            //show an edit form
        }
        else{
            //turn off edit
            setEditMode(!editMode)
        }
    }
    function handleFormSubmit(formEvent){
        formEvent.preventDefault()
        todoUpdateCallBack(displayingTodo)

    }
    function handleEditInputChange(inputEvent){
        setDisplayingTodo({id: todo.id, description: inputEvent.target.value, completed: todo.completed})

    }
    // function handleCancelButtonClick(){
    //
    // }

    return (
        <div className="todo-item">
            <div >
                <div className="checker"><span className=""><input type="checkbox" checked={!displayingTodo.completed?null:"true"}
                                                                   onChange={handleToggle}/></span></div>
                <span className={displayingTodo.completed?"text-strike":null}>{todo.description}</span>
                <button type="button" onClick={handleDelete} className="float-right btn-close" aria-label="Close">X</button>
            </div>
            {editMode?
                <div>
                    <form onSubmit={handleFormSubmit}>
                        <input value={displayingTodo.description} onChange={handleEditInputChange} placeholder="Enter the edit text"/>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={handleEditCancelButtonClick}>Cancel</button>
                    </form>
                </div>
                : <button type="button" onClick={handleEditCancelButtonClick} className=" btn btn-secondary" aria-label="Close">Edit</button>
            }



        {/*</a>*/}
        </div>
    );
}
export default Todo




