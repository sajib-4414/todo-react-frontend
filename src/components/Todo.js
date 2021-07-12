import React from "react";
function Todo({todo}) {
    return (
        <div className="todo-item">
            <div className="checker"><span className=""><input type="checkbox"/></span></div>
            <span>{todo.description}</span>
            <a href="javascript:void(0);" className="float-right remove-todo-item"><i
                className="icon-close"></i></a>
        </div>
    );
}
export default Todo