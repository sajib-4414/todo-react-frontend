import React from "react";
function Todo({todo}) {
    return (
        <div className="todo-item">
            <div className="checker"><span className=""><input type="checkbox"/></span></div>
            <span>{todo.description}</span>
            {/*<a  className="float-right remove-todo-item">*/}
                <button type="button" className="float-right btn-close" aria-label="Close">X</button>
        {/*</a>*/}
        </div>
    );
}
export default Todo