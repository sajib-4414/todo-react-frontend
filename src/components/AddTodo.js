import React,{Component} from "react";
import {TextField} from "@material-ui/core";
import { format } from "date-fns";

class AddTodo extends React.Component{
    state = {
        currentTodoDescription:"",
        currentTodoTitle:"",
        currentTodoDueDate:""
        
    }
    handleSubmit = formEvent =>{
        formEvent.preventDefault()
        const date = new Date(this.state.currentTodoDueDate);
        const formattedDate = format(date, "dd-MM-yyyy H:mm");

        const todo_object = {
            title: this.state.currentTodoTitle,
            description: this.state.currentTodoDescription,
            due_datetime: formattedDate
        }
        this.props.recieveTodoFromForm(todo_object)
        this.setState({
            currentTodoDescription:"",
            currentTodoTitle:"",
            currentTodoDueDate:""})
    }
    handleInputChange = inputEvent =>{
        this.setState({currentTodoDescription:inputEvent.target.value})
    }
    render() {
        return(
            <form onSubmit={this.handleSubmit}>

                <input type="text"
                       onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                placeholder="New Task title"
                       value={this.state.currentTodoTitle}
                       onChange={event=>this.setState({currentTodoTitle:event.target.value})}
                       className="form-control"/>
                <textarea
                       className="form-control add-task"
                       value={this.state.currentTodoDescription}
                       onChange={this.handleInputChange}
                       placeholder="New Todo Description..."/>
                <TextField
                    id="datetime-local"
                    label="Next appointment"
                    type="datetime-local"
                    value={this.state.currentTodoDueDate}
                    onChange={event=>this.setState({currentTodoDueDate:event.target.value})}
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    InputLabelProps={{
                        shrink: true,
                    }}

                />
                <button type="submit" className="btn btn-primary">Confirm Add</button>
            </form>
        )
    }



}

export default AddTodo