import React from "react";
import '../designs/Todo.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
function Todo({todo,notifyCompleteStatusChange, notifyItemDelete}) {

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
        notifyCompleteStatusChange(todo.id)
    }
    function handleDelete(){
        confirmAlert(options);

    }

    return (
        <div className="todo-item">
            <div className="checker"><span className=""><input type="checkbox" checked={!todo.completed?null:"true"}
                                                               onChange={handleToggle}/></span></div>
            <span className={todo.completed?"text-strike":null}>{todo.description}</span>
            {/*<a  className="float-right remove-todo-item">*/}
                <button type="button" onClick={handleDelete} className="float-right btn-close" aria-label="Close">X</button>
        {/*</a>*/}
        </div>
    );
}
export default Todo




