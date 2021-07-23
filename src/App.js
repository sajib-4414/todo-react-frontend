import './App.css';
import axiosInstance from "../src/axiosInstance";
import AddTodo from "./components/AddTodo";
import React from "react";
import TodoList from "./components/TodoList";
import './bootstrap/bootstrap.min.css'
import TodoTypeTabs from "./components/TodoTypeTabs";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {format} from "date-fns";
toast.configure()


class App extends React.Component{
  state = {
    todos:[],
    currentType:"All",
  }
  //this is temporary, it will be replaced by real time login
  login_auth_credentials = {
    auth:{
      username: "tanjim",
      password: "12345678"
    }
  }
  showErrorToast =(message)=>{
    toast.error(message, {
      // Set to 15sec
      position: toast.POSITION.BOTTOM_LEFT, autoClose:15000})
  }
  //todo_list_and_creation_url = "http://127.0.0.1:8000/todonew/"
    convert_datetime(inputString){
        const date = new Date(inputString);
        return format(date, "dd-MM-yyyy H:mm");
    }

  addTodo = (todo_payload)=>{
      //console.log(todo_payload)
      todo_payload.due_datetime = this.convert_datetime(todo_payload.due_datetime)

    // const data_payload = { title: todo_payload.title,description:desc,due_datetime:"10-10-2020 10:10"}
    axiosInstance.post('/todonew/', todo_payload, this.login_auth_credentials)
        .then(results=>{
          const todo_item = results.data
          this.setState({todos:[...this.state.todos,todo_item]})

          // toast('Hello Geeks')
        })
         .catch(error => {
           this.showErrorToast("Network error occurred while adding Todo")
           console.log(error.response)
         });
  }
  getTodosByType() {
    if (this.state.currentType === "Completed")
    {
      return this.state.todos.filter(todo=>todo.is_completed)
    }
    else if (this.state.currentType === "Active"){
      return this.state.todos.filter(todo=>!todo.is_completed)
    }
    return this.state.todos
  }
  changeTodoType = type =>{
    this.setState({currentType: type})
  }
  updateTodo = todo_edited=>{
      if ('due_datetime' in todo_edited){
             todo_edited.due_datetime = this.convert_datetime(todo_edited.due_datetime)
      }

      const todo_copy = {...todo_edited}
      Object.keys(todo_copy).forEach(
          key =>{
              if (todo_copy[key]==null){
                  delete todo_edited[key]
              }
          }
      )
      console.log("THis is the payload to be editted")
      console.log(todo_edited)
    axiosInstance.put('/todonew/'+todo_edited.id+"/", todo_edited, this.login_auth_credentials)
        .then(results=>{
          const todo_item_from_response = results.data
          this.setState({
            todos: this.state.todos.map(todo => {
              if (todo.id === todo_edited.id){
                return todo_item_from_response
              }
              return todo
            })
          })
        })
        .catch(error => {
          console.log(error.response)
          this.showErrorToast("Network error occurred updating the Todo")
        });


  }
  componentDidMount() {
    //fetching all existing list of todos
      //axiosInstance.get('/todonew/')
      axiosInstance
        .get('/todonew/',this.login_auth_credentials)
        .then(results =>
        {
            this.setState({todos:results.data})
            console.log("These are results of get call")
            console.log(results.data)
        }
        )
  }

  ItemDeleteCallBack = todoId =>{
      axiosInstance.delete('/todonew/'+todoId+"/",this.login_auth_credentials)
        .then(() => this.setState({todos:this.state.todos.filter(todo=>todo.id !==todoId)}))
        .catch(error => {
          this.showErrorToast("Network error occurred deleting Todo")
          console.log(error.response)
        })
    ;
  }

  render() {
    return (
        <React.Fragment>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-white">
                  <div className="card-body">

                    <AddTodo
                        recieveTodoFromForm = {this.addTodo}
                    />

                    <ul className="nav nav-pills todo-nav">
                      <TodoTypeTabs
                          changeTodoType = {this.changeTodoType}
                      />
                    </ul>
                    <div className="todo-list">
                      <TodoList
                          todos={this.getTodosByType()}
                          todoUpdateCallBack = {this.updateTodo}
                          ItemDeleteCallBack = {this.ItemDeleteCallBack}
                      />
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>


        </React.Fragment>


    );
  }



}

export default App;
