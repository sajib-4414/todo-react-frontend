import './App.css';
import AddTodo from "./components/AddTodo";
import React from "react";
import TodoList from "./components/TodoList";
import './bootstrap/bootstrap.min.css'
import TodoTypeTabs from "./components/TodoTypeTabs";
import axios from "axios";
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
  todo_list_and_creation_url = "http://127.0.0.1:8000/todonew/"
  // getId = ()=>{
  //   var maximum = 5000
  //   var minimum = 1
  //   var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  //   return randomnumber
  // }
  addTodo = (desc)=>{
    // var todo_item = {
    //   id: this.getId(),
    //   description:desc,
    //   is_completed: false
    // }

    const data_payload = { title: "test title",description:desc,due_datetime:"10-10-2020 10:10"}
    axios.post(this.todo_list_and_creation_url, data_payload, this.login_auth_credentials)
        .then(results=>{
          const todo_item = results.data
          this.setState({todos:[...this.state.todos,todo_item]})
        })
         .catch(error => {
           console.log(error.response)
         });;
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
    axios.put(this.todo_list_and_creation_url+todo_edited.id+"/", todo_edited, this.login_auth_credentials)
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
        });;


  }
  componentDidMount() {
    //fetching all existing list of todos
    axios
        .get(this.todo_list_and_creation_url,this.login_auth_credentials)
        .then(results =>    this.setState({todos:results.data})
        )
  }

  ItemDeleteCallBack = todoId =>{
    this.setState({todos:this.state.todos.filter(todo=>todo.id !==todoId)})
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
