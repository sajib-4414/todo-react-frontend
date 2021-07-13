import React,{Component} from "react";

class TodoTypeTabs extends React.Component{
    tabs = [
        "All",
        "Active",
        "Completed"
    ]
    state = {
        currentTab:"All"
    }
    sendTabTypeToParent = ({event, item})=>{
        this.props.changeTodoType(item)
    }
    render() {
        return(
            this.tabs.map(item => (
                <li role="presentation" className="nav-item all-task active"><a href="#" onClick={()=>{this.sendTabTypeToParent({item})}} className="nav-link">{item}</a></li>
            )))

    }
}
export default TodoTypeTabs