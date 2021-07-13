import React,{Component} from "react";
import Todo from "./Todo";

class TodoList extends React.Component {
    render() {
        return (
            this.props.todos.map(todoItem => (
                <Todo
                key= {todoItem.id}
                todo={todoItem}
                notifyCompleteStatusChange={this.props.changeTodoCompleteStatus}
                notifyItemDelete={this.props.ItemDeleteCallBack}
                />

            ))


        )
    }
}


        // <div>
        //     <div className="todo-item">
        //         <div className="checker"><span className=""><input type="checkbox"/></span></div>
        //         <span>Create theme</span>
        //         <a href="javascript:void(0);" className="float-right remove-todo-item"><i
        //             className="icon-close"></i></a>
        //     </div>
        //     <div className="todo-item">
        //         <div className="checker"><span className=""><input type="checkbox"/></span></div>
        //         <span>Work on wordpress</span>
        //         <a href="javascript:void(0);" className="float-right remove-todo-item"><i
        //             className="icon-close"></i></a>
        //     </div>
        //
        //     <div className="todo-item">
        //         <div className="checker"><span className=""><input type="checkbox"/></span></div>
        //         <span>Organize office main department</span>
        //         <a href="javascript:void(0);" className="float-right remove-todo-item"><i
        //             className="icon-close"></i></a>
        //     </div>
        //     <div className="todo-item">
        //         <div className="checker"><span><input type="checkbox"/></span></div>
        //         <span>Error solve in HTML template</span>
        //         <a href="javascript:void(0);" className="float-right remove-todo-item"><i
        //             className="icon-close"></i></a>
        //     </div>
        // </div>
    // )



export default TodoList