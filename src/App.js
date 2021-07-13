import './App.css';
import Header from "./Header";
import AddTodo from "./components/AddTodo";
import React,{Component} from "react";
import TodoList from "./components/TodoList";
import './bootstrap/bootstrap.min.css'
import TodoTypeTabs from "./components/TodoTypeTabs";
class App extends React.Component{
  state = {
    todos:[],
    currentType:"All",
  }
  getId = ()=>{
    var maximum = 5000
    var minimum = 1
    var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return randomnumber
  }
  addTodo = (desc)=>{
    var todo_item = {
      id: this.getId(),
      description:desc,
      completed: false
    }
    this.setState({todos:[...this.state.todos,todo_item]})
  }
  getChosenTodos() {
    if (this.state.currentType === "Completed")
    {
      return this.state.todos.filter(todo=>todo.completed)
    }
    else if (this.state.currentType === "Active"){
      return this.state.todos.filter(todo=>!todo.completed)
    }
    return this.state.todos
  }
  changeTodoType = type =>{
    this.setState({currentType: type})
  }

  render() {
    return (
        <React.Fragment>
          <Header/>
          <body>
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
                      <TodoList todos={this.getChosenTodos()}/>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>

          </body>

        </React.Fragment>


    );
  }



}

export default App;
