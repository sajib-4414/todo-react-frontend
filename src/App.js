import './App.css';
import Header from "./Header";
import AddTodo from "./components/AddTodo";
import React,{Component} from "react";
import TodoList from "./components/TodoList";
class App extends React.Component{
  state = {
    todos:[]
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
                      <li role="presentation" className="nav-item all-task active"><a href="#" className="nav-link">All</a></li>
                      <li role="presentation" className="nav-item active-task"><a href="#" className="nav-link">Active</a></li>
                      <li role="presentation" className="nav-item completed-task"><a href="#" className="nav-link">Completed</a>
                      </li>
                    </ul>
                    <div className="todo-list">
                      <TodoList todos={this.state.todos}/>
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
