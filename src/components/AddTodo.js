import React,{Component} from "react";
import {TextField} from "@material-ui/core";
import { format } from "date-fns";

class AddTodo extends React.Component{
    state = {
        currentTodoDescription:"",
        currentTodoTitle:"",
        currentTodoDueDate:"",
        errors:{
            currentTodoTitle: "",
            currentTodoDescription:"",
            currentTodoDueDate:""
        }
    }
    handleSubmit = formEvent =>{
        formEvent.preventDefault()
        //check for empty fileds
        const state_map = this.state
        const all_errors = {}
        const existing_errors = this.state.errors
        Object.keys(state_map).forEach(
            key =>{
                if (key !=="errors" && state_map[key] === ""){
                    if (existing_errors[key].length > 0){
                        all_errors[key] = existing_errors[key]
                    }
                    else{
                        all_errors[key] = "This field cannot be left empty"
                    }


                }

            }
        )
        console.log(all_errors)
        this.setState({errors: all_errors})

        //end check for empty filed


        // const date = new Date(this.state.currentTodoDueDate);
        // const formattedDate = format(date, "dd-MM-yyyy H:mm");
        //
        // const todo_object = {
        //     title: this.state.currentTodoTitle,
        //     description: this.state.currentTodoDescription,
        //     due_datetime: formattedDate
        // }
        // this.props.recieveTodoFromForm(todo_object)
        // this.setState({
        //     currentTodoDescription:"",
        //     currentTodoTitle:"",
        //     currentTodoDueDate:""})
    }
    handleChange = inputEvent =>{
        this.setState({ [inputEvent.target.name]:inputEvent.target.value})
        const target_name = inputEvent.target.name
        const target_value = inputEvent.target.value
        // console.log(target_name)
        switch (target_name){
            case "currentTodoTitle":
                if (target_value === ""){
                    this.setState({
                        errors:{...this.state.errors,
                            currentTodoTitle:"Title cannot be left empty"
                        }
                    })
                }
                else{
                    this.setState({
                        errors:{...this.state.errors,
                            currentTodoTitle:""
                        }
                    })
                }
                break
            case "currentTodoDescription":
                if (target_value === ""){
                    this.setState({
                        errors:{...this.state.errors,
                            currentTodoDescription:"Description cannot be left empty"
                        }
                    })
                }
                else{
                    this.setState({
                        errors:{...this.state.errors,
                            currentTodoDescription:""
                        }
                    })
                }
                break
            case "currentTodoDueDate":
                if (target_value === ""){
                    this.setState({
                        errors:{...this.state.errors,
                            currentTodoDueDate:"Due date cannot be left empty"
                        }
                    })
                }
                else{
                    this.setState({
                        errors:{...this.state.errors,
                            currentTodoDueDate:""
                        }
                    })
                }
                break

        }
    }
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input name="currentTodoTitle"
                        type="text"
                           onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                           placeholder="New Task title"
                           value={this.state.currentTodoTitle}
                           onChange={this.handleChange}
                           className="form-control"/>
                    <small  id="title_error" className="text-danger">
                        {this.state.errors.currentTodoTitle}
                    </small>
                </div>
                <div>
                     <textarea
                         name="currentTodoDescription"
                         className="form-control add-task"
                         value={this.state.currentTodoDescription}
                         onChange={this.handleChange}
                         placeholder="New Todo Description..."/>
                    <small id="title_error" className="text-danger">
                        {this.state.errors.currentTodoDescription}
                    </small>
                </div>

                <div>
                    <TextField
                        name="currentTodoDueDate"
                        id="datetime-local"
                        label="Next appointment"
                        type="datetime-local"
                        className="form-control"
                        value={this.state.currentTodoDueDate}
                        onChange={this.handleChange}
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                        InputLabelProps={{
                            shrink: true,
                        }}

                    />
                    <small id="title_error" className="text-danger">
                        {this.state.errors.currentTodoDueDate}
                    </small>
                </div>
                    <button style={{marginTop:10}} type="submit" className="btn btn-primary">Confirm Add</button>

            </form>
        )
    }



}

export default AddTodo