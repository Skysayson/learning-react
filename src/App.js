import React,{ useState, useRef, useEffect } from "react";
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos' //Declaration for saving inputted data locally

function App() {
  const [todos, setTodos] = useState([])
  const TodoNameRef = useRef()

  useEffect(() => { //function for storing inputted data locally
    const storedTodos = JSON.parse(localStorage.getItem
      (LOCAL_STORAGE_KEY)) //JASON.parse, communication between web and server, similar to a query in php
    if(storedTodos.length > 0) setTodos(storedTodos) //If storedTodos is > 0 meaning it isn't empty, it will store the inputted data
    }, []) //Array of dependencies, if anything changes in this array call function


  useEffect(() => { //function for saving data
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]) //Array of dependencies, if anything changes in this array; call function

  function todoToggle(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo (e) {
    const name = TodoNameRef.current.value
    if(name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: 
      false}]
    })
    TodoNameRef.current.value = null
  }

  function handleClearTodo () {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos);
  }

  return (
    <>
      <TodoList todos = {todos} todoToggle = {todoToggle} />
      <input ref={TodoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodo}>Clear Todos</button>
      <div>How many things left: {todos.filter(todo => !todo.complete).length}</div>
    </>
  )

}

export default App;
