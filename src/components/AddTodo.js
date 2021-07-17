import React,{Component} from "react";

class AddTodo extends React.Component{
    state = {
        currentTodoDescription:"",
        currentTodoTitle:"",
        currentTodoDueDate:""
        
    }
    handleSubmit = formEvent =>{
        formEvent.preventDefault()
        const todo_object = {
            title: this.state.currentTodoTitle,
            description: this.state.currentTodoDescription,
            due_datetime: this.state.currentTodoDueDate
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
                <input type="text" placeholder="Enter datetime"
                value={this.state.currentTodoDueDate}
                       className="form-control"
                       onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                onChange={event=>this.setState({currentTodoDueDate:event.target.value})}/>
                <button type="submit" className="btn btn-primary">Confirm Add</button>
            </form>
        )
    }



}

export default AddTodo