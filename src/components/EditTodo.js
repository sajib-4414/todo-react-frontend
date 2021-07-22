import {TextField} from "@material-ui/core";
import React from "react";
import {format} from "date-fns";

function EditTodo({todo_edit,cancelHandler}){

    const date = new Date(todo_edit.due_datetime);
    const formattedDate = format(date, "yyyy-MM-dd H:mm");
    const converted_date = formattedDate.substring(0,10) + "T"+ formattedDate.substring(11,16);
    return(
        <div>
            <form onSubmit="">
                <input value={todo_edit.title} className="form-control" />
                <textarea value={todo_edit.description} className="form-control" onChange="" placeholder="Enter the edit text"></textarea>
                <TextField
                    name="currentTodoDueDate"
                    id="datetime-local"
                    label="Next appointment"
                    type="datetime-local"
                    className="form-control"
                    defaultValue={converted_date}
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