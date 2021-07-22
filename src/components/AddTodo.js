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

        const state_map = this.state
        const all_errors = {}
        const existing_errors = this.state.errors
        Object.keys(state_map).forEach(
            key =>{
                //we just need to iterate over all the keys of the state, not the error, because, the error
                //have already these keys inside the error.
                //for each key we check do we have any empty values in the state, empty means
                //we have to show field is required
                // we also check if we have an existing errors for any key
                //in the state.errors, if we have something such as Date validation fail, invalid character
                //then we keep it as it is, so we see we take the error from the existing error object
                if (key !=="errors" && (state_map[key] === "" || existing_errors[key].length > 0)){
                    if (existing_errors[key].length > 0){
                        //check if this field (checked by key) had already an error or not
                        all_errors[key] = existing_errors[key]
                    }
                    else{
                        //just show this field is required
                        all_errors[key] = "This field cannot be left empty"
                    }


                }

            }
        )
        this.setState({errors: all_errors})

        //checking if there was no error, and it is ok to go
        if (Object.keys(all_errors).length === 0){
            //const date = new Date(this.state.currentTodoDueDate);
            //const formattedDate = format(date, "dd-MM-yyyy H:mm");

            const todo_object = {
                title: this.state.currentTodoTitle,
                description: this.state.currentTodoDescription,
                due_datetime: this.state.currentTodoDueDate
            }
            this.props.recieveTodoFromForm(todo_object)

            //reverting the state of this component to previous state
            this.setState({
                currentTodoDescription:"",
                currentTodoTitle:"",
                currentTodoDueDate:"",
                errors:{
                    currentTodoTitle: "",
                    currentTodoDescription:"",
                    currentTodoDueDate:""
                }
            })
        }



    }

    //this handles change for all the input field events
    handleChange = inputEvent =>{
        const target_name = inputEvent.target.name
        const target_value = inputEvent.target.value
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
              //  console.log("After switch case currentTOdoTItle")
                //console.log(this.state.errors)
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
              //  console.log("After switch case currentTodoDescription")
              //  console.log(this.state.errors)
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
                    //check for future dates
                    let today = new Date();
                    today.setHours(0,0,0,0);
                    const givenDate = new Date(target_value);
                  //  console.log(today)
                   // console.log(this.state.currentTodoDueDate)
                    if (givenDate <= today){
                        //console.log(this.state.errors)
                       // console.log("Hi I am her 3.2")
                        //console.log(this.state.errors)
                        this.setState({
                            errors:{...this.state.errors,
                                currentTodoDueDate:"Date is invalid, has to be a future date"
                            }
                        })
                    }
                    else{
                      //  console.log("Hi am here 3.3")
                        this.setState({
                            errors:{...this.state.errors,
                                currentTodoDueDate:""
                            }
                        })
                    }
                }
              //  console.log("After switch case currentTodoDueDate")
                //console.log(this.state.errors)
                break

        }
        this.setState({ [inputEvent.target.name]:inputEvent.target.value})

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