import React, { Component, useState, useEffect } from 'react';
import { TodoList } from './TodoList';
import { AddTodoForm } from './AddTodoForm';
import axios from "axios";


const initialTodos: Array<Todo> = [];

const App: React.FC = () => {

  const [todos, setTodos] = useState(initialTodos)

  const deleteTodo: DeleteTodo = (selectedTodo, id) => {
    const newTodos = todos.map(todo => {
      if (todo === selectedTodo) {

        axios.delete(`/todos/${id}`)
          .then(res => {
            if (res.status === 200) {
              console.log('delete success')
            } else {

            }
          })
          .catch()
        return {
          ...todo,
          complete: !todo.complete
        };
      }
      return todo
    });
    setTodos(newTodos)
  }

 



  const addTodo: AddTodo = newTodo => {
    newTodo.trim() !== "" &&
      setTodos([...todos, { description: newTodo, complete: false }])
  };


  React.useEffect(() => {

    const loadData = async () => {
      const response = await axios.get('/todos');
      setTodos(response.data);
    }
    loadData();
  }, [])

  return (
    <React.Fragment>
      <TodoList todos={todos} deleteTodo={deleteTodo} />
      <AddTodoForm addTodo={addTodo} />
    </React.Fragment>
  )

}

export default App;
