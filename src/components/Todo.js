import React, { useState, useRef } from "react";
import '../designs/Todo.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import {TextField} from "@material-ui/core";
import {format} from "date-fns";
import EditTodo from "./EditTodo"; // Import css
function Todo({todo,todoUpdateCallBack, notifyItemDelete}) {
    const [editMode, setEditMode] = useState(false);
    const [displayingTodo, setDisplayingTodo] = useState(todo);
    const todo_to_be_editted= useRef(todo);


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
    function submitTodoForEdit(todo_editted){
        todoUpdateCallBack(todo_editted)
        setEditMode(!editMode)
    }


    return (
        <div className="todo-item">
            <div >
                <div className="checker"><span className=""><input type="checkbox" checked={!displayingTodo.is_completed?null:"true"}
                                                                   onChange={handleToggle}/></span></div>
                <span className={displayingTodo.is_completed?"text-strike":null}>{todo.title}</span>
                <button type="button" onClick={handleDelete} className="float-right btn-close" aria-label="Close">X</button>
            </div>
            {editMode?
                <EditTodo
                todo_edit={todo_to_be_editted.current}
                cancelHandler={handleEditCancelButtonClick}
                editCallBackToTodo = {submitTodoForEdit}/>
                : <button type="button" onClick={handleEditCancelButtonClick} className=" btn btn-secondary" aria-label="Close">Edit</button>
            }



        {/*</a>*/}
        </div>
    );
}
export default Todo




