import {TextField} from "@material-ui/core";
import React, {useState} from "react";
import {format} from "date-fns";


function EditTodo({todo_edit,cancelHandler, editCallBackToTodo}){
    const [todo, setTodo] = useState(todo_edit);
    let error_object = {}
    Object.keys(todo).forEach(key=>{
        error_object[key] = ""
    })
    const [errors,setErrors] = useState(error_object)
    function showTime(timeToShow){


        const dt = new Date(timeToShow);
        const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
        const formattedDate = format(dtDateOnly, "yyyy-MM-dd H:mm");
        let time = formattedDate.split(' ')[1];
        const hours = time.split(':')[0]
        if(hours.length === 1){
            time = "0"+time
        }
        const outputTime = formattedDate.split(' ')[0] + "T"+ time;
        return outputTime
    }

    const handleChange = inputEvent=>{


        const target_name = inputEvent.target.name
        const target_value = inputEvent.target.value
        switch (target_name){
            case "title":
                if (target_value === ""){
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
                break
            case "due_datetime":
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
                      console.log(today)
                     console.log(givenDate)
                    if (givenDate <= today){
                        setErrors(
                            {...errors,
                                due_datetime:"Due date time has to be a future date"}
                        )
                    }
                    else{
                        setErrors(
                            {...errors,
                                due_datetime:""}
                        )
                    }
                }
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
   // console.log(todo_edit)
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
                    defaultValue={showTime(todo.due_datetime)}
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