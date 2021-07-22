import {TextField} from "@material-ui/core";
import React,{useState} from "react";
import {format} from "date-fns";


function EditTodo({todo_edit,cancelHandler, editCallBackToTodo}){
    const date = new Date(todo_edit.due_datetime);
    const formattedDate = format(date, "yyyy-MM-dd H:mm");
    console.log(" I am formatted date"+formattedDate)
    var time = formattedDate.split(' ')[1]
    const hours = time.split(':')[0]
    if(hours.length == 1){
        time = "0"+time
    }
    const converted_date = formattedDate.split(' ')[0] + "T"+ time;
    console.log(" I am converted date"+converted_date)
    todo_edit.due_datetime = converted_date
    const [todo, setTodo] = useState(todo_edit);

    const handleChange = event=>{
        setTodo({...todo, [event.target.name]:event.target.value})
    }
    function handleSubmit(formEvent){
        formEvent.preventDefault()
        editCallBackToTodo(todo)
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
                <textarea
                    name="description"
                    value={todo.description}
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Enter the edit text"></textarea>
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
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-danger" onClick={cancelHandler}>Cancel</button>
            </form>
        </div>
    )
}
export default EditTodo