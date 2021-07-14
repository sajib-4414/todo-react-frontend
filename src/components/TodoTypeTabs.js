import React,{Component} from "react";

class TodoTypeTabs extends React.Component{
    tabs = [
        "All",
        "Active",
        "Completed"
    ]
    getId = ()=>{
        var maximum = 5000
        var minimum = 1
        var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        return randomnumber
    }
    state = {
        currentTab:"All"
    }
    sendTabTypeToParent = ({event, item})=>{
        this.props.changeTodoType(item)
    }
    render() {
        return(
            this.tabs.map(item => (
                <li role="presentation" key={this.getId()} className="nav-item all-task active"><a href="#" onClick={()=>{this.sendTabTypeToParent({item})}} className="nav-link">{item}</a></li>
            )))

    }
}
export default TodoTypeTabs