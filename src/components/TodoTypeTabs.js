import React,{Component} from "react";

class TodoTypeTabs extends React.Component{
    render() {
        return(
            <React.Fragment>
                <li role="presentation" className="nav-item all-task active"><a href="#" className="nav-link">All</a></li>
                <li role="presentation" className="nav-item active-task"><a href="#" className="nav-link">Active</a></li>
                <li role="presentation" className="nav-item completed-task"><a href="#" className="nav-link">Completed</a></li>
            </React.Fragment>
        )
    }
}
export default TodoTypeTabs