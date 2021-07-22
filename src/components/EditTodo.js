import {TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {format} from "date-fns";
import {validate} from "@material-ui/pickers";
import {keys} from "@material-ui/core/styles/createBreakpoints";


function EditTodo({todo_edit,cancelHandler, editCallBackToTodo}){
    const date = new Date(todo_edit.due_datetime);
    const formattedDate = format(date, "yyyy-MM-dd H:mm");
    let time = formattedDate.split(' ')[1];
    const hours = time.split(':')[0]
    if(hours.length == 1){
        time = "0"+time
    }
    const converted_date = formattedDate.split(' ')[0] + "T"+ time;
    todo_edit.due_datetime = converted_date
    const [todo, setTodo] = useState(todo_edit);
    let error_object = {}
    Object.keys(todo).forEach(key=>{
        error_object[key] = ""
    })
    const [errors,setErrors] = useState(error_object)
    // const [errors,setErrors] = useState(todo_edit)
    // Object.keys(errors).forEach(
    //     key=>{
    //         setErrors({...errors,key:""})
    //     }
    // )


    const handleChange = inputEvent=>{


        const target_name = inputEvent.target.name
        const target_value = inputEvent.target.value
        switch (target_name){
            case "title":
                if (target_value === ""){
                   // alert("Hi I am here tit;e")
                    setErrors(
                        {...errors,
                            title:"Title cannot be left empty"}
                    )
                    console.log(errors)
                }
                else{
                    setErrors(
                        {...errors,
                            title:""}
                    )
                }
                //  console.log("After switch case currentTOdoTItle")
                //console.log(this.state.errors)
                break
            case "description":
              //  alert("Hi I am here desc")
                if (target_value === ""){
                    setErrors(
                        {...errors,
                            description:"Description cannot be left empty"}
                    )
                }
                else{
                    setErrors(
                        {...errors,
                            description:""}
                    )
                }
                //  console.log("After switch case currentTodoDescription")
                //  console.log(this.state.errors)
                break
            case "due_datetime":
              //  alert("Hi I am here date")
                if (target_value === ""){
                    setErrors(
                        {...errors,
                            due_datetime:"Due date time cannot be left empty"}
                    )
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
                        setErrors(
                            {...errors,
                                due_datetime:"Due date time has to be a future date"}
                        )
                    }
                    else{
                        //  console.log("Hi am here 3.3")
                        setErrors(
                            {...errors,
                                due_datetime:""}
                        )
                    }
                }
                //  console.log("After switch case currentTodoDueDate")
                //console.log(this.state.errors)
                break

        }
        setTodo({...todo, [inputEvent.target.name]:inputEvent.target.value})
    }
    function handleSubmit(formEvent){
        formEvent.preventDefault()
        //check if there was errors
        let ifFormValid = true
        Object.values(errors).forEach(
            value => {
                if (value.length >0){
                    ifFormValid = false
                }
            }
        )

        if (ifFormValid){
            editCallBackToTodo(todo)
            setTodo({})
            setErrors({})
        }

    }
    console.log(todo_edit)
    //const date = new Date(todo_edit.due_datetime);
    //const formattedDate = format(date, "yyyy-MM-dd H:mm");
    // const converted_date = formattedDate.substring(0,10) + "T"+ formattedDate.substring(11,16);
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input name="title"
                       value={todo.title}
                       onChange={handleChange}
                       className="form-control" />
                <small  id="title_error" className="text-danger">
                    {errors.title}
                </small>
                <textarea
                    name="description"
                    value={todo.description}
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter the edit text"></textarea>
                <small  id="description_error" className="text-danger">
                    {errors.description}
                </small>
                <TextField
                    name="due_datetime"
                    id="datetime-local"
                    label="Next appointment"
                    type="datetime-local"
                    className="form-control"
                    defaultValue={todo.due_datetime}
                    onChange={handleChange}
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    InputLabelProps={{
                        shrink: true,
                    }}

                />
                <small  id="datetime_error" className="text-danger">
                    {errors.due_datetime}
                </small>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-danger" onClick={cancelHandler}>Cancel</button>
            </form>
        </div>
    )
}
export default EditTodo