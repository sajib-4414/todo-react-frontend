import React,{ useState } from "react";
import '../designs/Todo.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import {TextField} from "@material-ui/core";
import {format} from "date-fns"; // Import css
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
        const editted_todo = {id: todo.id, description: displayingTodo.description, is_completed: !todo.is_completed}
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
        setEditMode(!editMode)

    }
    function handleEditInputChange(inputEvent){
        setDisplayingTodo({id: todo.id, description: inputEvent.target.value, is_completed: todo.is_completed})

    }
    // function handleCancelButtonClick(){
    //
    // }
    //console.log(displayingTodo)

    const date = new Date(displayingTodo.due_datetime);
    const formattedDate = format(date, "yyyy-MM-dd H:mm");
    const converted_date = formattedDate.substring(0,10) + "T"+ formattedDate.substring(11,16);
    return (
        <div className="todo-item">
            <div >
                <div className="checker"><span className=""><input type="checkbox" checked={!displayingTodo.is_completed?null:"true"}
                                                                   onChange={handleToggle}/></span></div>
                <span className={displayingTodo.is_completed?"text-strike":null}>{todo.title}</span>
                <button type="button" onClick={handleDelete} className="float-right btn-close" aria-label="Close">X</button>
            </div>
            {editMode?
                <div>
                    <form onSubmit={handleFormSubmit}>
                        <input value={displayingTodo.title} className="form-control" />
                        <textarea value={displayingTodo.description} className="form-control" onChange={handleEditInputChange} placeholder="Enter the edit text"></textarea>
                        <TextField
                            name="currentTodoDueDate"
                            id="datetime-local"
                            label="Next appointment"
                            type="datetime-local"
                            className="form-control"
                            defaultValue={converted_date}
                            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                            InputLabelProps={{
                                shrink: true,
                            }}

                        />
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" className="btn btn-danger" onClick={handleEditCancelButtonClick}>Cancel</button>
                    </form>
                </div>
                : <button type="button" onClick={handleEditCancelButtonClick} className=" btn btn-secondary" aria-label="Close">Edit</button>
            }



        {/*</a>*/}
        </div>
    );
}
export default Todo




