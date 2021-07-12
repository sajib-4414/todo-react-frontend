import React,{Component} from "react";

class AddTodo extends React.Component{
    state = {
        currentEditText:""
    }
    handleSubmit = formEvent =>{
        formEvent.preventDefault()
        this.props.recieveTodoFromForm(this.state.currentEditText)
        this.setState({currentEditText:""})
    }
    handleInputChange = inputEvent =>{
        this.setState({currentEditText:inputEvent.target.value})
    }
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                       className="form-control add-task"
                       value={this.state.currentEditText}
                       onChange={this.handleInputChange}
                       placeholder="New Task..."/>
            </form>
        )
    }



}

export default AddTodo