import React, {useState, useRef, useEffect} from "react";
import '../designs/Todo.css'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditTodo from "./EditTodo";
import {format} from "date-fns"; // Import css
function Todo({todo,todoUpdateCallBack, notifyItemDelete}) {
    const [editMode, setEditMode] = useState(false);
    const [isDetailMode,setIsDetailMode] = useState(false)
    const [displayingTodo, setDisplayingTodo] = useState(todo);
    const todo_to_be_editted= useRef(todo);

    useEffect(() => {
        setDisplayingTodo(todo)
        todo_to_be_editted.current = todo
    }, [todo]);

    const options = {
        title: 'Confirm delete?',
        message: 'Are you sure to delete this item from your todo list forever?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    notifyItemDelete(todo.id)
                }
            },
            {
                label: 'No',
                onClick: () => alert('Clicked No')
            }
        ],
        childrenElement: () => <div />,
        // customUI: ({ onClose }) => <div>Custom UI</div>,
        closeOnEscape: true,
        closeOnClickOutside: true,
        willUnmount: () => {},
        afterClose: () => {},
        onClickOutside: () => {},
        onKeypressEscape: () => {},
        overlayClassName: "overlay-custom-class-name"
    };

    function handleToggle(){
        // todo.completed = !todo.completed
        // setDisplayingTodo({id: todo.id, description: displayingTodo.description, completed: !todo.completed})
        const editted_todo = {id: todo.id, description: displayingTodo.description, is_completed: !todo.is_completed}
        todoUpdateCallBack(editted_todo)
        setDisplayingTodo(editted_todo)
        todo_to_be_editted.current = editted_todo

    }
    const handleDetailModeToggle = ()=>{
        setIsDetailMode(!isDetailMode)
    }
    function handleDelete(){
        confirmAlert(options);
    }

    function handleEditCancelButtonClick(){
        // alert("Hi I am here")
        if (!editMode){
            setEditMode(!editMode)
            //toggle edit now
            //show an edit form
        }
        else{
            //turn off edit
            setEditMode(!editMode)
        }
    }
    function submitTodoForEdit(todo_editted){
        todoUpdateCallBack(todo_editted)
        setEditMode(!editMode)
    }

    const showFamiliarDueDate = (inputTimeString)=>{
        const dt = new Date(inputTimeString);
        const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);

        //for formatting help visit documentation
        //https://date-fns.org/v2.22.1/docs/format
        const formattedDate = format(dtDateOnly, "do MMMM yyyy p");
        console.log("converted time is "+formattedDate)
        return formattedDate
    }

    return (
        <div className="todo-item">

            <div >
                <div className="checker"><span className=""><input type="checkbox" checked={!displayingTodo.is_completed?null:"true"}
                                                                   onChange={handleToggle}/></span></div>
                <label>Title:</label>
                <span className={displayingTodo.is_completed?"text-strike":null}>{todo.title}</span>
                <button onClick={handleDetailModeToggle}> {isDetailMode ? '-' : '+' }</button>
                {isDetailMode ?
                    <div>
                        <div>
                            <label>Description</label>
                            <p>{displayingTodo.description}</p>
                        </div>
                        <div>
                            <label>Due date</label>
                            <p>{showFamiliarDueDate(displayingTodo.due_datetime)}</p>
                        </div>
                    </div>
                    : '' }

                <button type="button" onClick={handleDelete} className="float-right btn-close" aria-label="Close">X</button>
            </div>
            {editMode?
                <EditTodo
                todo_edit={todo_to_be_editted.current}
                cancelHandler={handleEditCancelButtonClick}
                editCallBackToTodo = {submitTodoForEdit}/>
                : <button type="button" onClick={handleEditCancelButtonClick} className=" btn btn-secondary" aria-label="Close">Edit</button>
            }


        </div>
    );
}
export default Todo




