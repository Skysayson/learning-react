import React from 'react'
import Todo from './todo'

export default function TodoList({todos, todoToggle}) {
  return (
    todos.map(todo => {
      return <Todo key={todo.id} todoToggle={todoToggle} todo = {todo} />   
    })
  )
}
