import React from "react";
import '../designs/Todo.css'
function Todo({todo,notifyCompleteStatusChange, notifyItemDelete}) {
    function handleToggle(){
        // todo.completed = !todo.completed
        notifyCompleteStatusChange(todo.id)
    }
    function handleDelete(){
        notifyItemDelete(todo.id)
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